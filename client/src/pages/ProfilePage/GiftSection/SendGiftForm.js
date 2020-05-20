import React, { useState, useEffect } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { RadioField } from "../../../components/formikFields";
import Button from "../../../components/common/Button";
import styles from "./SendGiftForm.module.css";
import queryGiftOptions, {
  getGiftsWithPagination
} from "../../../data/queryGiftOptions";
import { saveGift } from "../../../data/queryGifts";
import Text from "../../../components/common/Text";
import Spinner from "../../../components/common/Spinner";
import Title from "../../../components/common/Title";

const SendGiftForm = ({ user }) => {
  const [gifts, setGifts] = useState([]);
  const [startFrom, setStartFrom] = useState(0);
  const [count, setCount] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [wasSent, setWasSent] = useState(false);

  const perPage = 6;

  useEffect(() => {
    setIsLoading(true);
    const getGifts = async () => {
      const results = await getGiftsWithPagination({
        startFrom,
        perPage
      });
      setIsLoading(false);
      setGifts(results.results);
      setCount(results.count);
    };

    getGifts();
  }, [startFrom, user]);

  const nextPage = () => {
    if (startFrom + perPage < count) {
      setStartFrom(prev => prev + perPage);
    }
  };

  const lastPage = () => {
    if (startFrom - perPage > -1) {
      setStartFrom(prev => prev - perPage);
    }
  };

  const calculateCurrentPage = () => {
    return (startFrom + perPage) / perPage;
  };

  return (
    <div>
      {wasSent ? (
        <Title text="Tu Regalo fue enviado!" typeStyle="secondary" />
      ) : (
        <Formik
          initialValues={{
            gift: ""
          }}
          onSubmit={async (values, { setErrors }) => {
            console.log(setErrors);
            const giftOption = await queryGiftOptions.get(values.gift);
            saveGift(user, giftOption)
              .then(() => setWasSent(true))
              .catch(err => {
                setErrors({ gift: err.message });
              });
          }}
          validate={values => {
            if (values.gift === "") {
              return {
                gift: "Debes selecionar un regalo!"
              };
            }
          }}
        >
          <Form className={styles.form}>
            <Title text="Elige el regalo" />
            <Title
              text="Solo puedes enviar 10 regalos por dia"
              typeStyle="secondary"
              fontSize="14px"
            />
            <div className={styles.gifts}>
              {isLoading ? (
                <Spinner />
              ) : (
                gifts.map((gift, index) => (
                  <RadioField
                    name="gift"
                    typeStyle="borderLines"
                    value={gift.id}
                    key={index}
                    className={styles.giftPreview}
                  >
                    <div>
                      <img
                        alt={gift.attributes.name}
                        src={gift.attributes.image.url()}
                      />
                      <Text text={gift.attributes.name} fontSize="12px" />
                    </div>
                  </RadioField>
                ))
              )}
            </div>
            <ErrorMessage name="gift" />
            {!isLoading && (
              <Text
                text={`${calculateCurrentPage()} de ${Math.ceil(
                  count / perPage
                )} paginas`}
              />
            )}

            <div className={styles.buttons}>
              <Button
                onClick={lastPage}
                disabled={startFrom - perPage < -1}
                typeStyle="secondary"
              >
                Anterior
              </Button>
              <Button
                onClick={nextPage}
                disabled={startFrom + perPage > count}
                typeStyle="secondary"
              >
                Siguiente
              </Button>
            </div>
            <Button type="submit" className={styles.submitButton}>
              Enviar
            </Button>
          </Form>
        </Formik>
      )}
    </div>
  );
};

export default SendGiftForm;
