import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";
import {
  Heading,
  TextStyle,
  Card,
  ChoiceList,
  Filters,
  ResourceList,
  Spinner,
  Pagination,
} from "@shopify/polaris";
import {
  getListUsers,
  getOptionsCategoriesInUsers,
  getAllUsersExport,
} from "../actions/manageUsers";
import ExportExcel from "./modal/manageUsers/ExportExcel";
import DeleteUser from "./modal/manageUsers/DeleteUser";
import Alert from "./contents/Alert";
import Loading from "./contents/Spinner";

const ManageUsers = ({
  getOptionsCategoriesInUsers,
  getListUsers,
  getAllUsersExport,
  users: {
    listUsers,
    totalUsers,
    optionsCategoriesInUsers,
    loadingTableUsers,
    listAllUsersExport,
    loadingUsers,
  },
}) => {
  useEffect(() => {
    getOptionsCategoriesInUsers();
  }, [getOptionsCategoriesInUsers]);
  useEffect(() => {
    getListUsers();
  }, [getListUsers]);
  useEffect(() => {
    getAllUsersExport();
  }, [getAllUsersExport]);
  //table
  const [offsetSearch, setOffsetSearch] = useState(0);
  const [givenConsent, setGivenConsent] = useState(null);
  const optionsSort = [
    { label: "Most resent", value: "sortDateAZ" },
    { label: "Oldest", value: "sortDateZA" },
    { label: "Sort by email A-Z", value: "sortMailAZ" },
    { label: "Sort by email Z-A", value: "sortMailZA" },
  ];
  const [queryValue, setQueryValue] = useState(null);
  const [sort, setSort] = useState(null);

  const handleGivenConsentChange = useCallback(
    (value, offsetSearch, queryValue, sort) => {
      getListUsers(offsetSearch, queryValue, sort, value);
      setGivenConsent(value);
    },
    []
  );
  const handleSortChange = useCallback(
    (value, offsetSearch, queryValue, givenConsent) => {
      getListUsers(offsetSearch, queryValue, value, givenConsent);
      setSort(value);
    },
    []
  );
  const handleFiltersQueryChange = useCallback(
    (value, offsetSearch, sort, givenConsent) => {
      getListUsers(offsetSearch, value, sort, givenConsent);
      setQueryValue(value);
    },
    []
  );
  const handleGivenConsentRemove = useCallback(
    (queryValue, offsetSearch, sort) => {
      getListUsers(offsetSearch, queryValue, sort, "");
      setGivenConsent(null);
    },
    []
  );
  const handleSortWithRemove = useCallback(
    (offsetSearch, queryValue, givenConsent) => {
      getListUsers(offsetSearch, queryValue, "", givenConsent);
      setSort(null);
    },
    []
  );
  const handleQueryValueRemove = useCallback((sort, givenConsent) => {
    getListUsers(0, "", sort, givenConsent);
    setQueryValue(null);
  }, []);
  const handleFiltersClearAll = useCallback(() => {
    getListUsers();
  }, []);

  const handleChangePre = (queryValue, sort, givenConsent) => {
    if (offsetSearch >= 1) {
      setOffsetSearch(offsetSearch - 1);
      getListUsers(offsetSearch - 1, queryValue, sort, givenConsent);
    }
  };
  const handleChangeNext = (queryValue, sort, givenConsent) => {
    if (offsetSearch + 1 < totalUsers / 20) {
      setOffsetSearch(offsetSearch + 1);
      getListUsers(offsetSearch + 1, queryValue, sort, givenConsent);
    }
  };
  const filters = [
    {
      key: "givenConsent",
      label: "Given consent",
      filter: (
        <ChoiceList
          title="Given consent"
          titleHidden
          choices={optionsCategoriesInUsers}
          selected={givenConsent || []}
          onChange={(e) =>
            handleGivenConsentChange(e, offsetSearch, queryValue, sort)
          }
          allowMultiple
        />
      ),
      shortcut: true,
    },
    {
      key: "sort",
      label: "Sort",
      filter: (
        <ChoiceList
          titleHidden
          choices={optionsSort}
          selected={sort || []}
          onChange={(e) => {
            handleSortChange(e, offsetSearch, queryValue, givenConsent);
          }}
        />
      ),
      shortcut: true,
    },
  ];

  const appliedFilters = [];
  if (!isEmpty(givenConsent)) {
    const key = "givenConsent";
    let convertToLabel = [];
    givenConsent.map((e) => {
      convertToLabel.push(
        optionsCategoriesInUsers.filter((j) => j.value == e)[0].label
      );
    });
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, convertToLabel),
      onRemove: () => handleGivenConsentRemove(queryValue, offsetSearch, sort),
    });
  }

  if (!isEmpty(sort)) {
    const key = "sort";
    let convertToLabel = [];
    sort.map((e) => {
      convertToLabel.push(optionsSort.filter((j) => j.value == e)[0].label);
    });
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, convertToLabel),
      onRemove: () =>
        handleSortWithRemove(offsetSearch, queryValue, givenConsent),
    });
  }
  return (
    <div>
      <Alert />
      {loadingUsers && <Loading />}
      <div
        style={{
          margin: "20px 0",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Heading element="h1">Manage users</Heading>
        <div style={{ display: "flex" }}>
          <ExportExcel currentPage={listUsers} allPage={listAllUsersExport} />
          <DeleteUser type="Delete all users" />
        </div>
      </div>
      <Card>
        <ResourceList
          resourceName={{ singular: "users", plural: "users" }}
          filterControl={
            <div>
              <Filters
                queryValue={queryValue}
                filters={filters}
                appliedFilters={appliedFilters}
                onQueryChange={(e) =>
                  handleFiltersQueryChange(e, offsetSearch, sort, givenConsent)
                }
                onQueryClear={() => handleQueryValueRemove(sort, givenConsent)}
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
                      <th width="25%">Email</th>
                      <th width="20%">Customer</th>
                      <th width="20%">Given Consent</th>
                      <th width="20%">IP Address</th>
                      <th width="15%">Date Created</th>
                      <th width="15%">Action</th>
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
                    {listUsers.map((data, index) => (
                      <tr key={index} name="rowChecked">
                        {/* <td style={{ paddingLeft: "17px" }}>
                            <input
                              type="checkbox"
                              name="nameProducts[]"
                              value={data.id}
                              // onClick={handleCheckOnly}
                            ></input>
                          </td> */}
                        <td>{data["email"]}</td>
                        {data["customer_id"] == "0" ? (
                          <td>-</td>
                        ) : (
                          <td>{data["customer_id"]}</td>
                        )}

                        <td>
                          {JSON.parse(data["givent_consent"]).map((e) => (
                            <div style={{ margin: "3px 0" }}>{e.name}</div>
                          ))}
                        </td>
                        <td>{data["ip"]}</td>
                        <td>{data["date_created"]}</td>
                        <td>
                          <DeleteUser idUser={data["id"]} type="Delete user" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              {loadingTableUsers && (
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
                listUsers.length == 0 && loadingTableUsers == false && (
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
                  handleChangePre(queryValue, sort, givenConsent)
                }
                hasNext
                onNext={() => handleChangeNext(queryValue, sort, givenConsent)}
              />
            </div>
          }
          items={[{ name: "users" }]}
          renderItem={(item) => {
            return <ResourceList.Item></ResourceList.Item>;
          }}
        />
      </Card>
    </div>
  );
  function disambiguateLabel(key, value) {
    switch (key) {
      case "sort":
        return `Sort with ${value}`;
      case "givenConsent":
        return value.map((val) => `Filter by ${val}`).join(", ");
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
  users: state.users,
});
export default connect(mapStateToProps, {
  getOptionsCategoriesInUsers,
  getListUsers,
  getAllUsersExport,
})(ManageUsers);
