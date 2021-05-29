import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";
import Alert from "./contents/Alert";
import Loading from "./contents/Spinner";
import {
  Heading,
  TextStyle,
  Card,
  Filters,
  ResourceList,
  Tabs,
  Spinner,
  Badge,
  Pagination,
} from "@shopify/polaris";
import CreateEditCategories from "./modal/manageCategories/CreateEditCategories";
import DeleteCategories from "./modal/manageCategories/DeleteCategories";
import { getListCategories } from "../actions/manageCategories";
const ManageCategories = ({
  getListCategories,
  categories: {
    listCategories,
    countCategories,
    loadingCategories,
    loadingTableCategories,
  },
}) => {
  const [offsetSearch, setOffsetSearch] = useState(0);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    getListCategories();
  }, [getListCategories]);
  const handleTabChange = useCallback(
    (selectedTabIndex, queryValue, offsetSearch) => {
      getListCategories(offsetSearch, queryValue, selectedTabIndex);
      setSelected(selectedTabIndex);
    },
    []
  );

  const tabs = [
    {
      id: "all",
      content: "All",
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
      id: "necessary",
      content: "Necessary",
    },
  ];

  //table

  const [queryValue, setQueryValue] = useState(null);

  const handleFiltersQueryChange = useCallback(
    (value, offsetSearch, selected) => {
      getListCategories(offsetSearch, value, selected);
      setQueryValue(value);
    },
    []
  );

  const handleQueryValueRemove = useCallback((offsetSearch, selected) => {
    getListCategories(offsetSearch, "", selected);
    setQueryValue(null);
  }, []);
  const handleFiltersClearAll = useCallback(() => {
    getListCategories();
  }, [handleQueryValueRemove]);

  const filters = [];

  const appliedFilters = [];
  const handleChangePre = (valueSearch, selected) => {
    if (offsetSearch >= 1) {
      setOffsetSearch(offsetSearch - 1);
      getListCategories(offsetSearch - 1, valueSearch, selected);
    }
  };
  const handleChangeNext = (valueSearch, selected) => {
    if (offsetSearch + 1 < countCategories / 20) {
      setOffsetSearch(offsetSearch + 1);
      getListCategories(offsetSearch + 1, valueSearch, selected);
    }
  };
  return (
    <div>
      <Alert />
      {loadingCategories && <Loading />}
      <div
        style={{
          margin: "20px 0",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Heading element="h1">Manage categories</Heading>
        <div style={{ marginRight: "10px" }}>
          <CreateEditCategories
            styleForm="Add category"
            queryValue={queryValue}
            selected={selected}
            offsetSearch={offsetSearch}
          />
        </div>
      </div>
      <Card>
        <Tabs
          tabs={tabs}
          selected={selected}
          onSelect={(e) => handleTabChange(e, queryValue, offsetSearch)}
        ></Tabs>
        <div>
          <ResourceList
            resourceName={{ singular: "categories", plural: "categories" }}
            filterControl={
              <div>
                <Filters
                  queryValue={queryValue}
                  filters={filters}
                  appliedFilters={appliedFilters}
                  onQueryChange={(e) =>
                    handleFiltersQueryChange(e, offsetSearch, selected)
                  }
                  onQueryClear={() =>
                    handleQueryValueRemove(offsetSearch, selected)
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
                        <th width="20%">Status</th>
                        <th width="20%">Necessary</th>
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
                      {/* {loadingTable == false && */}
                      {listCategories.map((data, index) => (
                        <tr key={index} name="rowChecked">
                          {/* <td style={{ paddingLeft: "17px" }}>
                            <input
                              type="checkbox"
                              name="nameProducts[]"
                              value={data.id}
                              // onClick={handleCheckOnly}
                            ></input>
                          </td> */}
                          <td>{data["category_name"]}</td>
                          <td>{data["category_description"]}</td>
                          <td>
                            {data.category_status === "1" ? (
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
                            {data.is_necessary === "1" ? (
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
                              <CreateEditCategories
                                styleForm="Edit category"
                                idCategoryEdit={data.id}
                                titleEdit={data.category_name}
                                descriptionEdit={data.category_description}
                                statusEdit={data.category_status}
                                queryValue={queryValue}
                                selected={selected}
                                offsetSearch={offsetSearch}
                              />
                              <DeleteCategories
                                idCategory={data.id}
                                is_necessary={data.is_necessary}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
                {loadingTableCategories && (
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
                  listCategories.length == 0 && loadingTableCategories == false && (
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
                  onPrevious={() => handleChangePre(queryValue, selected)}
                  hasNext
                  onNext={() => handleChangeNext(queryValue, selected)}
                />
              </div>
            }
            items={[{ name: "categories" }]}
            renderItem={(item) => {
              return <ResourceList.Item></ResourceList.Item>;
            }}
          />
        </div>
      </Card>
    </div>
  );
};
const mapStateToProps = (state) => ({
  categories: state.categories,
});

export default connect(mapStateToProps, {
  getListCategories,
})(ManageCategories);
