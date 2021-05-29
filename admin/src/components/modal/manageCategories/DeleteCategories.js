import React, { useCallback, useState, useEffect } from "react";
import { Modal, Button, TextContainer } from "@shopify/polaris";
import { connect } from "react-redux";
import {
  deleteCategory,
  getListCategories,
  reloadCategories,
} from "../../../actions/manageCategories";
import { showAlert } from "../../../actions/manageAlert";

import { DeleteMinor } from "@shopify/polaris-icons";

const DeleteCategories = ({
  showAlert,
  reloadCategories,
  deleteCategory,
  idCategory,
  getListCategories,
  is_necessary,
}) => {
  const [active, setActive] = useState(false);
  const handleChange = useCallback(() => {
    setActive(!active);
  }, [active]);

  const handleSubmit = useCallback(async () => {
    setActive(!active);

    if (is_necessary == "1") {
      showAlert("Cannot delete the necessary category!");
    } else {
      reloadCategories();
      await deleteCategory(idCategory);
      getListCategories();
    }
  });

  const activator = (
    <Button id="btn-outline" onClick={handleChange} icon={DeleteMinor}></Button>
  );

  return (
    <Modal
      activator={activator}
      open={active}
      onClose={handleChange}
      title="Delete category"
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
          <p>
            Are you sure you want to delete this category? (Cookies in this
            category will become unregistered cookies)
          </p>
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
  deleteCategory,
  getListCategories,
  reloadCategories,
  showAlert,
})(DeleteCategories);
