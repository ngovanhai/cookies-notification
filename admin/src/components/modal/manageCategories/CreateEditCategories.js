import React, { useCallback, useState, useEffect } from "react";
import {
  Modal,
  Button,
  TextField,
  Stack,
  RadioButton,
  TextStyle,
} from "@shopify/polaris";
import { connect } from "react-redux";
import { getOptionsCategories } from "../../../actions/manageCategories";
import {
  addCategory,
  editCategory,
  getListCategories,
  reloadCategories,
} from "../../../actions/manageCategories";
import { showAlert } from "../../../actions/manageAlert";

import { EditMinor } from "@shopify/polaris-icons";

const CreateEditCategories = ({
  showAlert,
  styleForm,
  getOptionsCategories,
  addCategory,
  titleEdit,
  descriptionEdit,
  statusEdit,
  idCategoryEdit,
  editCategory,
  getListCategories,
  reloadCategories,

  queryValue,
  selected,
  offsetSearch,

  categories: { optionsCategories },
}) => {
  const [active, setActive] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("unPublishStatus");
  useEffect(() => {
    if (styleForm == "Add category") {
      setStatus("unPublishStatus");
    }
    if (idCategoryEdit) {
      setTitle(titleEdit);
      setDescription(descriptionEdit);

      if (statusEdit == 1) {
        setStatus("publishStatus");
      } else {
        setStatus("unPublishStatus");
      }
    }
  }, [active]);

  const handleChangeTitle = useCallback((newValue) => setTitle(newValue), []);

  const handleChangeDescription = useCallback(
    (newValue) => setDescription(newValue),
    []
  );

  const handleChangeStatus = useCallback((_checked, newValue) => {
    setStatus(newValue);
  }, []);
  const handleChange = useCallback(() => {
    setActive(!active);
  }, [active]);
  const handleClose = useCallback(() => {
    setActive(!active);
    resetField();
  }, [active]);
  const resetField = useCallback(() => {
    setTitle("");
    setStatus("");
    setDescription("");
  }, [active]);
  const handleSubmit = useCallback(async (title, description, status) => {
    if (title == "") {
      showAlert("Title is required!");
    } else {
      handleChange();
      if (styleForm == "Add category") {
        reloadCategories();
        await addCategory(title, description, status);
        getListCategories(offsetSearch, queryValue, selected);
        resetField();
      } else {
        reloadCategories();
        await editCategory(idCategoryEdit, title, description, status);
        getListCategories(offsetSearch, queryValue, selected);
        resetField(queryValue, selected, offsetSearch);
      }
    }
  });

  let activator = (
    <Button id="btn-outline" onClick={handleChange} icon={EditMinor}></Button>
  );
  switch (styleForm) {
    case "Add category": {
      activator = (
        <Button primary size="slim" onClick={handleChange}>
          Add category
        </Button>
      );
    }
  }

  return (
    <Modal
      large
      activator={activator}
      open={active}
      onClose={handleClose}
      title={styleForm}
      primaryAction={{
        content: "Submit",
        onAction: () => handleSubmit(title, description, status),
      }}
      secondaryActions={[
        {
          content: "Close",
          onAction: handleChange,
        },
      ]}
    >
      <Modal.Section>
        <div className="marginTop-15">
          <TextField label="Title" value={title} onChange={handleChangeTitle} />
        </div>
        <div className="marginTop-15">
          <TextField
            label="Description"
            value={description}
            multiline={4}
            onChange={handleChangeDescription}
          />
        </div>
        <div className="marginTop-15">
          <TextStyle>Publish cookie</TextStyle>
        </div>
        <div className="marginTop-15">
          <Stack vertical>
            <RadioButton
              label="Publish"
              checked={status === "publishStatus"}
              id="publishStatus"
              name="radioPublish"
              onChange={handleChangeStatus}
            />
            <RadioButton
              label="UnPublish"
              id="unPublishStatus"
              name="radioPublish"
              checked={status === "unPublishStatus"}
              onChange={handleChangeStatus}
            />
          </Stack>
        </div>
      </Modal.Section>
    </Modal>
  );
};
const mapStateToProps = (state) => ({
  categories: state.categories,
});

export default connect(mapStateToProps, {
  getOptionsCategories,
  addCategory,
  editCategory,
  getListCategories,
  reloadCategories,
  showAlert,
})(CreateEditCategories);
