import React from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { ReactComponent as ShareIcon } from "../../../assets/icons/share.svg";
import styles from "./index.module.css";
import FlexRow from "../FlexRow";
import Text from "../Text";
import Button from "../Button";
import { site_url } from "../../../config/config";

const ShareButtons = ({ title, text, url }) => {
  const link = `${site_url}/${url}`;
  return (
    <FlexRow alignItems="center" className={styles.container}>
      {navigator.share ? (
        <Button
          typeStyle="secondary"
          className={styles.shareButton}
          onClick={() => navigator.share({ ...title, ...text, link })}
        >
          Compartir
          <ShareIcon className={styles.shareIcon} width="15px" height="15px" />
        </Button>
      ) : (
        <>
          <Text text="Compartir en :" />
          <FacebookShareButton url={link}>
            <div className={styles.button}>
              Facebook
              <FacebookIcon
                className={styles.icon}
                width="25px"
                height="25px"
              />
            </div>
          </FacebookShareButton>
          <TwitterShareButton url={link}>
            <div className={styles.button}>
              Twitter
              <TwitterIcon className={styles.icon} width="25px" height="25px" />
            </div>
          </TwitterShareButton>
          <WhatsappShareButton url={link}>
            <div className={styles.button}>
              Whatsapp
              <WhatsappIcon
                className={styles.icon}
                width="25px"
                height="25px"
              />
            </div>
          </WhatsappShareButton>
        </>
      )}
    </FlexRow>
  );
};

ShareButtons.defaultProps = {
  text: null,
  title: null,
};

export default ShareButtons;
