import React, { useCallback, useState, useEffect } from "react";
import {
  Modal,
  Button,
  TextField,
  Stack,
  RadioButton,
  TextStyle,
  Autocomplete,
  Icon,
} from "@shopify/polaris";
import { connect } from "react-redux";
import { getOptionsCategories } from "../../../actions/manageCategories";
import {
  addCookie,
  editCookie,
  getListCookies,
  reloadCookies,
} from "../../../actions/manageCookies";
import { showAlert } from "../../../actions/manageAlert";

import { EditMinor, SearchMinor } from "@shopify/polaris-icons";

const CreateEditCookies = ({
  showAlert,
  idCookieEdit,
  styleForm,
  getOptionsCategories,
  addCookie,
  reloadCookies,
  titleEdit,
  descriptionEdit,
  statusEdit,
  idCategoryEdit,
  editCookie,
  getListCookies,

  valueSearch,
  selected,
  categoriesFilter,
  offsetSearch,
  categories: { optionsCategories },
}) => {
  const [active, setActive] = useState(false);

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(optionsCategories);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("unPublishStatus");
  useEffect(() => {
    if (styleForm == "Add cookie") {
      setStatus("unPublishStatus");
    }
    if (idCookieEdit) {
      setTitle(titleEdit);
      setDescription(descriptionEdit);

      if (statusEdit == 1) {
        setStatus("publishStatus");
      } else {
        setStatus("unPublishStatus");
      }
      setSelectedOptions([idCategoryEdit]);
      if (idCategoryEdit) {
        let categoryTitle = optionsCategories.filter(
          (e) => e.value == idCategoryEdit
        );
        if (categoryTitle.length > 0) {
          setInputValue(categoryTitle[0].label);
        }
      }
    }
  }, [active]);
  useEffect(() => {
    setOptions(optionsCategories);
  }, [optionsCategories]);

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
    setSelectedOptions([]);
    setInputValue("");
  });
  const handleSubmit = useCallback(
    async (selectedOptions, title, description, status, inputValue) => {
      if (title !== "" && selectedOptions.length > 0) {
        handleChange();
        if (styleForm == "Add cookie") {
          reloadCookies();
          await addCookie(
            selectedOptions,
            title,
            description,
            status,
            inputValue
          );
          getListCookies(valueSearch, selected, categoriesFilter, offsetSearch);
          resetField();
        } else {
          reloadCookies();
          await editCookie(
            idCookieEdit,
            selectedOptions,
            title,
            description,
            status,
            inputValue
          );
          getListCookies(valueSearch, selected, categoriesFilter, offsetSearch);
          resetField();
        }
      } else if (title == "" || selectedOptions.length == 0) {
        showAlert("Title empty or have not selected the correct category!");
      }
    }
  );

  let activator = (
    <Button id="btn-outline" onClick={handleChange} icon={EditMinor}></Button>
  );
  switch (styleForm) {
    case "Add cookie": {
      activator = (
        <Button primary size="slim" onClick={handleChange}>
          Add cookie
        </Button>
      );
    }
  }

  const updateText = useCallback(
    (value) => {
      setInputValue(value);

      if (value === "") {
        setOptions(optionsCategories);
        return;
      }

      const filterRegex = new RegExp(value, "i");
      const resultOptions = optionsCategories.filter((option) =>
        option.label.match(filterRegex)
      );
      setOptions(resultOptions);
    },
    [optionsCategories]
  );

  const updateSelection = useCallback(
    (selected) => {
      const selectedValue = selected.map((selectedItem) => {
        const matchedOption = options.find((option) => {
          return option.value.match(selectedItem);
        });
        return matchedOption && matchedOption.label;
      });

      setSelectedOptions(selected);
      setInputValue(selectedValue[0]);
    },
    [options]
  );
  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label="Choose category"
      value={inputValue}
      prefix={<Icon source={SearchMinor} color="base" />}
      placeholder="Search"
    />
  );

  return (
    <Modal
      large
      activator={activator}
      open={active}
      onClose={handleClose}
      title={styleForm}
      primaryAction={{
        content: "Submit",
        onAction: () =>
          handleSubmit(selectedOptions, title, description, status, inputValue),
      }}
      secondaryActions={[
        {
          content: "Close",
          onAction: handleChange,
        },
      ]}
    >
      <Modal.Section>
        <Autocomplete
          options={options}
          selected={selectedOptions}
          onSelect={updateSelection}
          textField={textField}
        />
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
  addCookie,
  editCookie,
  getListCookies,
  reloadCookies,
  showAlert,
})(CreateEditCookies);
