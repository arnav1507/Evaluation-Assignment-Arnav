import MaterialTable from "material-table";
import { useEffect, useState } from "react";

function Material_Table() {
  const [tableData, setTableData] = useState([]);

  const columns = [
    {
      title: "Name",
      field: "name",
      filterPlaceholder: "Filter by name",
      emptyValue: () => <em>null</em>,
    },
    {
      title: "Email",
      field: "email",
      filterPlaceholder: "Filter by email",
      emptyValue: () => <em>null</em>,
    },
    {
      title: "Username",
      field: "username",
      emptyValue: () => <em>null</em>,
      filterPlaceholder: "Filter by username",
    },
    {
      title: "Phone",
      field: "phone",
      filterPlaceholder: "Filter by phone",
      emptyValue: () => <em>null</em>,
    },
    {
      title: "Website",
      field: "website",
      filterPlaceholder: "Filter by website",
      emptyValue: () => <em>null</em>,
    },
  ];

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((res) => setTableData(res));
  }, []);

  return (
    <div className="App">
      <MaterialTable
        columns={columns}
        data={tableData}
        title="Evaluation Assignment"
        editable={{
          onRowAdd: (newRow) =>
            new Promise((resolve, reject) => {
              setTableData([...tableData, newRow]);
              setTimeout(() => resolve(), 500);
            }),
          onRowUpdate: (newRow, oldRow) =>
            new Promise((resolve, reject) => {
              const updatedData = [...tableData];
              updatedData[oldRow.tableData.id] = newRow;
              setTableData(updatedData);
              setTimeout(() => resolve(), 500);
            }),
          onRowDelete: (selectedRow) =>
            new Promise((resolve, reject) => {
              const updatedData = [...tableData];
              updatedData.splice(selectedRow.tableData.id, 1);
              setTableData(updatedData);
              setTimeout(() => resolve(), 500);
            }),
        }}
        options={{
          searchAutoFocus: true,
          filtering: true,
          pageSizeOptions: [2, 5, 10, 20, 25, 50, 100],
          pageSize: 10,
          paginationType: "stepped",
          showFirstLastPageButtons: false,
          exportButton: true,
          exportAllData: true,
          exportFileName: "TableData",
          addRowPosition: "first",
          actionsColumnIndex: -1,
        }}
      />
    </div>
  );
}

export default Material_Table;
