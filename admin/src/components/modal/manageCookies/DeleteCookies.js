import React, { useCallback, useState } from "react";
import { Modal, Button, TextContainer } from "@shopify/polaris";
import { connect } from "react-redux";
import {
  deleteCookie,
  getListCookies,
  reloadCookies,
} from "../../../actions/manageCookies";

import { DeleteMinor } from "@shopify/polaris-icons";

const DeleteCookies = ({
  deleteCookie,
  idCookie,
  getListCookies,
  reloadCookies,
}) => {
  const [active, setActive] = useState(false);
  const handleChange = useCallback(() => {
    setActive(!active);
  }, [active]);

  const handleSubmit = useCallback(async () => {
    setActive(!active);
    reloadCookies();

    await deleteCookie(idCookie);
    getListCookies();
  });

  const activator = (
    <Button id="btn-outline" onClick={handleChange} icon={DeleteMinor}></Button>
  );

  return (
    <Modal
      activator={activator}
      open={active}
      onClose={handleChange}
      title="Delete cookie"
      primaryAction={{
        content: "Delete",
        onAction: handleSubmit,
        destructive: true,
      }}
      secondaryActions={[
        {
          content: "Close",
          onAction: handleChange,
        },
      ]}
    >
      <Modal.Section>
        <TextContainer>
          <p>Are you sure you want to delete this cookie?</p>
          <br></br>
          <p>This action cannot be undone !</p>
        </TextContainer>
      </Modal.Section>
    </Modal>
  );
};
const mapStateToProps = (state) => ({
  categories: state.categories,
});

export default connect(mapStateToProps, {
  deleteCookie,
  getListCookies,
  reloadCookies,
})(DeleteCookies);
