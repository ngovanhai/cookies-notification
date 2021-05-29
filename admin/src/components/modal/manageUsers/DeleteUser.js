import React, { useCallback, useState } from "react";
import { Modal, Button, TextContainer } from "@shopify/polaris";
import { connect } from "react-redux";
import {
  getListUsers,
  deleteOneUser,
  deleteAllUsers,
  reloadUsers,
} from "../../../actions/manageUsers";

import { DeleteMinor } from "@shopify/polaris-icons";

const DeleteUser = ({
  reloadUsers,
  getListUsers,
  deleteOneUser,
  idUser,
  type,
  deleteAllUsers,
}) => {
  const [active, setActive] = useState(false);
  const handleChange = useCallback(() => {
    setActive(!active);
  }, [active]);

  const handleSubmit = useCallback(async () => {
    setActive(!active);
    reloadUsers();
    if (type == "Delete all users") {
      await deleteAllUsers();
      getListUsers();
    } else {
      await deleteOneUser(idUser);
      getListUsers();
    }
  });

  let activator = (
    <Button id="btn-outline" onClick={handleChange} icon={DeleteMinor}></Button>
  );
  switch (type) {
    case "Delete all users": {
      activator = (
        <Button destructive onClick={handleChange} size="slim">
          Delete all
        </Button>
      );
    }
  }

  return (
    <Modal
      activator={activator}
      open={active}
      onClose={handleChange}
      title={type}
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
          {type == "Delete all users" ? (
            <p>Are you sure you want to delete all user?</p>
          ) : (
            <p>Are you sure you want to delete this user?</p>
          )}
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
  getListUsers,
  deleteOneUser,
  deleteAllUsers,
  reloadUsers,
})(DeleteUser);
