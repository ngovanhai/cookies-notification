import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";
import {
  getListCookies,
  getCookiesSan,
  closeUpdateModal,
  openUpdateModal,
} from "../actions/manageCookies";
import { getSettings } from "../actions/settings";
import { getOptionsCategories } from "../actions/manageCategories";
import CreateEditCookies from "./modal/manageCookies/CreateEditCookies";
import DeleteCookies from "./modal/manageCookies/DeleteCookies";
import Alert from "./contents/Alert";
import Loading from "./contents/Spinner";
import config from "../config/config";
import {
  Heading,
  Card,
  ChoiceList,
  Filters,
  ResourceList,
  Tabs,
  Badge,
  Pagination,
  Banner,
  Subheading,
  Layout,
  Spinner,
  TextStyle,
  Scrollable,
  Button,
  Modal,
  Stack,
} from "@shopify/polaris";
const ManageCookies = ({
  getCookiesSan,
  getSettings,
  getListCookies,
  getOptionsCategories,
  closeUpdateModal,
  openUpdateModal,
  cookies: {
    listCookies,
    countCookies,
    loadingCookies,
    loadingTableCookies,
    listCookiesScanned,
    statusModalUpdate,
  },
  categories: { optionsCategories },
  settings: { dataSettings },
}) => {
  const [selected, setSelected] = useState(0);
  const [offsetSearch, setOffsetSearch] = useState(0);
  const [categoriesFilter, setCategoriesFilter] = useState(null);
  const [queryValue, setQueryValue] = useState(null);
  const handleTabChange = useCallback((selectedTabIndex, queryValue) => {
    setSelected(selectedTabIndex);
    getListCookies(queryValue, selectedTabIndex);
    setCategoriesFilter(null);
  }, []);
  useEffect(() => {
    getSettings();
  }, [getSettings]);
  useEffect(() => {
    getCookiesSan();
  }, [getCookiesSan]);
  useEffect(() => {
    getListCookies();
  }, [getListCookies]);

  useEffect(() => {
    getOptionsCategories();
  }, []);
  const tabs = [
    {
      id: "all",
      content: "All",
    },
    {
      id: "notCategory",
      content: "Not Category",
    },
    {
      id: "publish",
      content: "Publish",
    },
    {
      id: "unPublish",
      content: "Unpublish",
    },
    {
      id: "scanned",
      content: "Scanned",
    },
  ];

  //table

  const handleCategoriesFilterChange = useCallback(
    (value, queryValue, selected) => {
      getListCookies(queryValue, selected, value);
      setCategoriesFilter(value);
    },
    []
  );
  const handleFiltersQueryChange = useCallback(
    (value, selected, categoriesFilter) => {
      getListCookies(value, selected, categoriesFilter);
      setQueryValue(value);
    },
    []
  );
  const handleCategoriesFilterRemove = useCallback((queryValue, selected) => {
    getListCookies(queryValue, selected, "");
    setCategoriesFilter(null);
  }, []);
  const handleSelectedFilterRemove = useCallback(
    (queryValue, categoriesFilter) => {
      getListCookies(queryValue, 0, categoriesFilter);
      setSelected(0);
    },
    []
  );
  const handleQueryValueRemove = useCallback((selected, categoriesFilter) => {
    getListCookies("", selected, categoriesFilter);
    setQueryValue(null);
  }, []);
  const handleFiltersClearAll = useCallback(() => {
    getListCookies();
  }, [handleCategoriesFilterRemove, handleQueryValueRemove]);

  const handleChangePre = (valueSearch, selected, categoriesFilter) => {
    if (offsetSearch >= 1) {
      setOffsetSearch(offsetSearch - 1);
      getListCookies(valueSearch, selected, categoriesFilter, offsetSearch - 1);
    }
  };
  const handleChangeNext = (valueSearch, selected, categoriesFilter) => {
    if (offsetSearch + 1 < countCookies / 20) {
      setOffsetSearch(offsetSearch + 1);
      getListCookies(valueSearch, selected, categoriesFilter, offsetSearch + 1);
    }
  };
  const filters = [
    {
      key: "categoriesFilter",
      label: "Categories",
      filter: (
        <ChoiceList
          title="Categories"
          titleHidden
          choices={optionsCategories}
          selected={categoriesFilter || []}
          onChange={(e) =>
            handleCategoriesFilterChange(e, queryValue, selected)
          }
          allowMultiple
        />
      ),
      shortcut: true,
    },
  ];
  const appliedFilters = [];
  if (!isEmpty(categoriesFilter)) {
    const key = "categoriesFilter";
    let convertToLabel = [];
    categoriesFilter.map((e) => {
      convertToLabel.push(
        optionsCategories.filter((j) => j.value == e)[0].label
      );
    });
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, convertToLabel),
      onRemove: () => handleCategoriesFilterRemove(queryValue, selected),
    });
  }
  if (!isEmpty(selected) && selected !== 0) {
    const key = "tabFilter";
    let title = "";
    switch (selected) {
      case 1: {
        title = "Not Category";
        break;
      }
      case 2: {
        title = "Publish";
        break;
      }
      case 3: {
        title = "Unpublish";
        break;
      }
      case 4: {
        title = "Scanned";
        break;
      }
      default:
        break;
    }
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, title),
      onRemove: () => handleSelectedFilterRemove(queryValue, categoriesFilter),
    });
  }

  const activator = (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Button onClick={() => openUpdateModal()}>
        New Version <sup id="titleUpdateVersion">New </sup>
      </Button>
    </div>
  );
  return (
    <div>
      {dataSettings.permission === "0" && (
        <Modal
          large
          activator={activator}
          open={statusModalUpdate}
          onClose={() => closeUpdateModal()}
          title={
            <div style={{ display: "flex" }}>
              <h1 style={{ marginRight: "10px", fontFamily: "serif" }}>
                App has a New version!
              </h1>
            </div>
          }
          primaryAction={{
            content: "Update now",
            onAction: () => {
              window.open(
                "https://" +
                  config.shop +
                  "/admin/oauth/request_grant?client_id=6b2b8ff7415c82eba60cc5446d15596c&redirect_uri=https://apps.omegatheme.com/cookies-notification/add_permissions.php&scope=read_script_tags,write_script_tags,read_themes,write_themes,read_customers"
              );
            },
          }}
          secondaryActions={[
            {
              content: "Close",
              onAction: () => closeUpdateModal(),
            },
          ]}
        >
          <Modal.Section>
            <Stack vertical>
              <div style={{ padding: "20px", fontFamily: "revert" }}>
                <h1
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "25px",
                  }}
                >
                  Upgrade to Get All the Features
                </h1>
                <table className="table" style={{ marginTop: "30px" }}>
                  <thead>
                    <tr>
                      <th
                        className="borderTable"
                        style={{ fontSize: "18px" }}
                        scope="col"
                        width="40%"
                      >
                        Features
                      </th>
                      <th
                        className="borderTable"
                        scope="col"
                        style={{ textAlign: "center", fontSize: "18px" }}
                        width="25%"
                      >
                        Starter
                      </th>
                      <th
                        className="borderTable"
                        scope="col"
                        style={{ textAlign: "center", fontSize: "18px" }}
                        width="25%"
                      >
                        Basic
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="borderTable">Show Banner</td>
                      <td
                        className="borderTable"
                        style={{ textAlign: "center" }}
                      >
                        <Badge status="success">Yes</Badge>
                      </td>
                      <td
                        className="borderTable"
                        style={{ textAlign: "center" }}
                      >
                        <Badge status="success">Yes</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="borderTable">
                        Design color and text in Banner
                      </td>
                      <td
                        className="borderTable"
                        style={{ textAlign: "center" }}
                      >
                        <Badge status="success">Yes</Badge>
                      </td>
                      <td
                        className="borderTable"
                        style={{ textAlign: "center" }}
                      >
                        <Badge status="success">Yes</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="borderTable">Show Preference</td>
                      <td
                        className="borderTable"
                        style={{ textAlign: "center" }}
                      >
                        <Badge>No</Badge>
                      </td>
                      <td
                        className="borderTable"
                        style={{ textAlign: "center" }}
                      >
                        <Badge status="success">Yes</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="borderTable">
                        Design color and text in Preference
                      </td>
                      <td
                        className="borderTable"
                        style={{ textAlign: "center" }}
                      >
                        <Badge>No</Badge>
                      </td>
                      <td
                        className="borderTable"
                        style={{ textAlign: "center" }}
                      >
                        <Badge status="success">Yes</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="borderTable">Cookie statistics</td>
                      <td
                        className="borderTable"
                        style={{ textAlign: "center" }}
                      >
                        <Badge>No</Badge>
                      </td>
                      <td
                        className="borderTable"
                        style={{ textAlign: "center" }}
                      >
                        <Badge status="success">Yes</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="borderTable">Categories statistics</td>
                      <td
                        className="borderTable"
                        style={{ textAlign: "center" }}
                      >
                        <Badge>No</Badge>
                      </td>
                      <td
                        className="borderTable"
                        style={{ textAlign: "center" }}
                      >
                        <Badge status="success">Yes</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="borderTable">
                        Scan cookies from shop online
                      </td>
                      <td
                        className="borderTable"
                        style={{ textAlign: "center" }}
                      >
                        <Badge>No</Badge>
                      </td>
                      <td
                        className="borderTable"
                        style={{ textAlign: "center" }}
                      >
                        <Badge status="success">Yes</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="borderTable">
                        Statistics list of users who accept cookies
                      </td>
                      <td
                        className="borderTable"
                        style={{ textAlign: "center" }}
                      >
                        <Badge>No</Badge>
                      </td>
                      <td
                        className="borderTable"
                        style={{ textAlign: "center" }}
                      >
                        <Badge status="success">Yes</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="borderTable">
                        Display detailed information about cookies
                      </td>
                      <td
                        className="borderTable"
                        style={{ textAlign: "center" }}
                      >
                        <Badge>No</Badge>
                      </td>
                      <td
                        className="borderTable"
                        style={{ textAlign: "center" }}
                      >
                        <Badge status="success">Yes</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="borderTable">
                        Customer can accept some cookies / accept all cookies
                      </td>
                      <td
                        className="borderTable"
                        style={{ textAlign: "center" }}
                      >
                        <Badge>No</Badge>
                      </td>
                      <td
                        className="borderTable"
                        style={{ textAlign: "center" }}
                      >
                        <Badge status="success">Yes</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="borderTable">---</td>
                      <td
                        className="borderTable"
                        style={{ textAlign: "center" }}
                      >
                        <i className="freeText">FREE</i>
                      </td>
                      <td
                        className="borderTable"
                        style={{ textAlign: "center" }}
                      >
                        <i className="freeText">FREE for 100 users</i>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <TextStyle variation="subdued">
                  Your current version:{" "}
                </TextStyle>
                <b style={{ marginLeft: "10px" }}>Starter</b>
              </div>
            </Stack>
          </Modal.Section>
        </Modal>
      )}
      <Alert />
      {loadingCookies && <Loading />}
      <div
        style={{
          margin: "20px 0",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Heading element="h1">Manage cookies</Heading>
        <div style={{ display: "flex" }}>
          <CreateEditCookies
            styleForm="Add cookie"
            valueSearch={queryValue}
            selected={selected}
            categoriesFilter={categoriesFilter}
            offsetSearch={offsetSearch}
          />
        </div>
      </div>
      <Card>
        <div style={{ padding: "20px" }}>
          <Subheading>Scan cookies form shop online</Subheading>
          <div className="marginTop-15">
            <Layout>
              <Layout.Section oneHalf>
                <Card sectioned>
                  <Scrollable style={{ height: "120px" }} focusable>
                    {listCookiesScanned.map((e) => (
                      <p>{e.cookie_name}</p>
                    ))}
                  </Scrollable>
                </Card>
              </Layout.Section>
              <Layout.Section oneHalf>
                <div style={{ margin: "5px 0 0 20px" }}>
                  <h1 id="titleScan">What dose the Cookie Scanner do?</h1>
                  <p>
                    The Cookie Scanner simply shows you all of the cookies, that
                    are present in your store, when a customer visits the store
                    for a first time
                  </p>
                </div>
              </Layout.Section>
            </Layout>
          </div>
        </div>
      </Card>
      <Card>
        <Tabs
          tabs={tabs}
          selected={selected}
          onSelect={(e) => handleTabChange(e, queryValue, offsetSearch)}
        ></Tabs>
        <ResourceList
          resourceName={{ singular: "cookies", plural: "cookies" }}
          filterControl={
            <div>
              <Filters
                queryValue={queryValue}
                filters={filters}
                appliedFilters={appliedFilters}
                onQueryChange={(e) =>
                  handleFiltersQueryChange(e, selected, categoriesFilter)
                }
                onQueryClear={() =>
                  handleQueryValueRemove(selected, categoriesFilter)
                }
                onClearAll={handleFiltersClearAll}
              />
              <div style={{ overflowX: "auto" }}>
                <Table id="table">
                  <thead id="thead-table" className="thTable">
                    {/* {arrCheckedProducts.length == 0 && ( */}
                    <tr>
                      {/* <th width="5%" style={{ paddingLeft: "17px" }}>
                          <input
                            type="checkbox"
                            // onClick={handleCheckAll}
                            // defaultChecked={statusCheckAll}
                            id="check_all"
                          ></input>
                        </th> */}
                      <th width="25%">Title</th>
                      <th width="20%">Description</th>
                      <th width="20%">Category</th>
                      <th width="20%">Status</th>
                      <th width="20%">Scanned</th>
                      <th width="15%" style={{ textAlign: "center" }}>
                        Actions
                      </th>
                    </tr>
                    {/* )}
                      {arrCheckedProducts.length !== 0 && (
                        <tr>
                          <th width="5%"></th>
                          <th width="25%"></th>
                          <th width="20%"></th>
                          <th width="20%"></th>
                           <th width="10%"></th>
                          <th width="15%"></th>
                        </tr>
                      )}  */}
                  </thead>
                  <tbody>
                    {/* {loadingTableCookies == false && */}
                    {listCookies.map((data, index) => (
                      <tr key={index} name="rowChecked">
                        {/* <td style={{ paddingLeft: "17px" }}>
                            <input
                              type="checkbox"
                              name="nameProducts[]"
                              value={data.id}
                              // onClick={handleCheckOnly}
                            ></input>
                          </td> */}
                        <td>{data["cookie_name"]}</td>
                        <td>{data["cookie_description"]}</td>

                        {data["category_name"] ? (
                          <td>{data["category_name"]}</td>
                        ) : (
                          <td>
                            <Badge>Unregistered</Badge>
                          </td>
                        )}
                        <td>
                          {data.cookie_status === "1" ? (
                            <div>
                              <Badge status="success">Published</Badge>
                              <br></br>
                            </div>
                          ) : (
                            <div>
                              <Badge>UnPublished</Badge>
                              <br></br>
                            </div>
                          )}
                        </td>
                        <td>
                          {data.is_scanned === "1" ? (
                            <div>
                              <Badge status="success">Yes</Badge>
                              <br></br>
                            </div>
                          ) : (
                            <div>
                              <Badge>No</Badge>
                              <br></br>
                            </div>
                          )}
                        </td>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <CreateEditCookies
                              styleForm="Edit cookie"
                              idCookieEdit={data.id}
                              titleEdit={data.cookie_name}
                              descriptionEdit={data.cookie_description}
                              statusEdit={data.cookie_status}
                              idCategoryEdit={data.category_id}
                              valueSearch={queryValue}
                              selected={selected}
                              categoriesFilter={categoriesFilter}
                              offsetSearch={offsetSearch}
                            />
                            <DeleteCookies idCookie={data.id} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              {loadingTableCookies && (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "30vh",
                  }}
                >
                  <Spinner
                    accessibilityLabel="Spinner example"
                    size="large"
                    color="inkLightest"
                  />
                </div>
              )}
              {
                listCookies.length == 0 && loadingTableCookies == false && (
                  <div
                    style={{
                      width: "100%",
                      textAlign: "center",
                      lineHeight: "30vh",
                      height: "30vh",
                    }}
                  >
                    <TextStyle variation="subdued">Not found data!</TextStyle>
                  </div>
                ) //có dữ liệu nhưng trống
              }
              <Pagination
                style={{ float: "right!important" }}
                hasPrevious
                onPrevious={() =>
                  handleChangePre(queryValue, selected, categoriesFilter)
                }
                hasNext
                onNext={() =>
                  handleChangeNext(queryValue, selected, categoriesFilter)
                }
              />
            </div>
          }
          items={[{ name: "cookies" }]}
          renderItem={(item) => {
            return <ResourceList.Item></ResourceList.Item>;
          }}
        />
      </Card>
    </div>
  );
  function disambiguateLabel(key, value) {
    switch (key) {
      case "categoriesFilter":
        return value.map((val) => `Filter by "${val}"  category`).join(", ");
      case "tabFilter":
        return `Filter by "${value}"`;
      default:
        return value;
    }
  }

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return value === "" || value == null;
    }
  }
};
const mapStateToProps = (state) => ({
  cookies: state.cookies,
  categories: state.categories,
  settings: state.settings,
});

export default connect(mapStateToProps, {
  getListCookies,
  getOptionsCategories,
  getSettings,
  getCookiesSan,
  closeUpdateModal,
  openUpdateModal,
})(ManageCookies);
