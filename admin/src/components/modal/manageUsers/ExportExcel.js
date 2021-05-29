import React, { useCallback, useState } from "react";
import {
  Button,
  TextContainer,
  Modal,
  RadioButton,
  Stack,
} from "@shopify/polaris";

export default function ExportExcel(state) {
  const [value, setValue] = useState("currentPage");
  const handleChangeRadio = useCallback(
    (_checked, newValue) => setValue(newValue),
    []
  );
  const [active, setActive] = useState(false);
  const handleChange = useCallback(() => setActive(!active), [active]);
  const handleSubmit = useCallback(
    (value) => {
      handleChange();
      if (value == "currentPage") {
        var htmls = "";
        var uri = "data:application/vnd.ms-excel;base64,";
        var template =
          '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';
        var base64 = function (s) {
          return window.btoa(unescape(encodeURIComponent(s)));
        };
        var format = function (s, c) {
          return s.replace(/{(\w+)}/g, function (m, p) {
            return c[p];
          });
        };
        htmls = `
            <table>
                <tr>
                    <td>Email </td>
                    <td>Customer </td>
                    <td>Given Consent </td>
                    <td>IP Address </td>
                    <td>Date Created </td>
                </tr>
        `;
        for (let i = 0; i < state.currentPage.length; i++) {
          let data = state.currentPage[i];
          let givent_consent = "";
          JSON.parse(data["givent_consent"]).map(
            (e) => (givent_consent += e.name + ",")
          );
          htmls += `
              <tr>
                  <td>${data["email"]}</td>
                  <td>${data["customer_id"]}</td>
                  <td>
                  ${givent_consent}
                    </td>
                      <td>${data["ip"]}</td>
                  <td>${data["date_created"]} </td>
              </tr>
          `;
          if (i == state.currentPage.length - 1) {
            htmls += `   </table>`;
            var ctx = {
              worksheet: "Users accept",
              table: htmls,
            };
            var link = document.createElement("a");
            link.download = "users-accept.xls";
            link.href = uri + base64(format(template, ctx));
            link.click();
          }
        }
      } else if (value == "allPage") {
        var htmls = "";
        var uri = "data:application/vnd.ms-excel;base64,";
        var template =
          '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';
        var base64 = function (s) {
          return window.btoa(unescape(encodeURIComponent(s)));
        };
        var format = function (s, c) {
          return s.replace(/{(\w+)}/g, function (m, p) {
            return c[p];
          });
        };
        htmls = `
            <table>
                <tr>
                    <td>Email </td>
                    <td>Customer </td>
                    <td>Given Consent </td>
                    <td>IP Address </td>
                    <td>Date Created </td>
                </tr>
        `;
        for (let i = 0; i < state.allPage.length; i++) {
          let data = state.allPage[i];
          let givent_consent = "";
          JSON.parse(data["givent_consent"]).map(
            (e) => (givent_consent += e.name + ",")
          );
          htmls += `
              <tr>
                  <td>${data["email"]}</td>
                  <td>${data["customer_id"]}</td>
                  <td>
                  ${givent_consent}
                    </td>
                      <td>${data["ip"]}</td>
                  <td>${data["date_created"]} </td>
              </tr>
          `;
          if (i == state.allPage.length - 1) {
            htmls += `   </table>`;
            var ctx = {
              worksheet: "Users accept",
              table: htmls,
            };
            var link = document.createElement("a");
            link.download = "users-accept.xls";
            link.href = uri + base64(format(template, ctx));
            link.click();
          }
        }
      }
    },
    [active]
  );

  const activator = (
    <Button primary size="slim" onClick={handleChange}>
      Export excel
    </Button>
  );

  return (
    <div style={{ float: "right", marginRight: "10px" }}>
      <Modal
        activator={activator}
        open={active}
        onClose={handleChange}
        title="Are you sure you want to export data to Excel file?"
        primaryAction={{
          content: "Agree",
          onAction: () => handleSubmit(value),
        }}
        secondaryActions={[
          {
            content: "Disagree",
            onAction: handleChange,
          },
        ]}
      >
        <Modal.Section>
          <TextContainer>
            <a id="export-review-download"></a>
            <Stack vertical>
              <RadioButton
                label="Current page"
                checked={value === "currentPage"}
                id="currentPage"
                name="typeExport"
                onChange={handleChangeRadio}
              />
              <RadioButton
                label="All users accept cookies"
                id="allPage"
                name="typeExport"
                checked={value === "allPage"}
                onChange={handleChangeRadio}
              />
            </Stack>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </div>
  );
}
