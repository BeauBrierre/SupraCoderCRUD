import React from 'react';
import MaterialTable, { MTableAction, MTableBodyRow } from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import styles from './Inventory.module.css';
import axios from 'axios';

//sets background color to silver
document.body.style = 'background: silver;';

//establish user specific information and grant all manager opportunities
const InventoryManager = ({user, setUser, tableIcons, data, setData, columns}) => {
  const tableRef = React.createRef();
  const addActionRef = React.useRef();
  const defaultMaterialTheme = createTheme();


  return (
    <div>
      <ThemeProvider theme={defaultMaterialTheme}>
			{/* button for adding new items */}
	  		<div className={styles.subBanner}>
				<p className={styles.text} onClick={() => addActionRef.current.click()}>New Entry +</p>
			</div>
      	<MaterialTable
        tableRef={tableRef}
        columns={columns}
        data={data}
		icons={tableIcons}
        title='Inventory'
		options={{
			tableLayout: 'auto'
		  }}
		components={{
			//establish effects from different possible manager actions
			Action: props => {
				  if (typeof props.action === typeof Function || props.action.tooltip !== 'Add') return <MTableAction {...props} />
				  else return <div ref={addActionRef} onClick={props.action.onClick}/>;
				},
				// if someone tries to double click to edit they will be reminded how to make changes
				Row: props => (
					<MTableBodyRow
					  {...props}
					  onDoubleClick={e => {
						console.log(props.actions);
						props.actions[1]().onClick(e);
						alert("Click the edit icon to update.");
					  }}
					/>
				  )
			}}
			editable={{
				//collect data and use axios to update database
				onRowAdd: (newData) =>
				new Promise((resolve, reject) => {
					newData['user'] = user;
					axios.post(
						'http://127.0.0.1:5000/add-inventory',
						newData,
						{withCredentials: true}
					).then((response) => {
						setData(JSON.parse(response.data.inventory));
					}).catch((err) => {
					  alert(err.response.data.message);
					  console.log(err);
					});
					resolve();
				  }),
				//find data to update, make edits using axios to reach database information
				onRowUpdate: (newData, oldData) =>
				  new Promise((resolve, reject) => {
					newData['user'] = user;
					newData['oldName'] = oldData['name'];
					axios.post(
						'http://127.0.0.1:5000/update-inventory',
						newData,
						{withCredentials: true}
					).then((response) => {
						setData(JSON.parse(response.data.inventory));
					}).catch((err) => {
					  alert(err.response.data.message);
					  console.log(err);
					});
					resolve();
				  }),
				//use axios to find in database and remove
				onRowDelete: oldData =>
				  new Promise((resolve, reject) => {
					axios.post(
						'http://127.0.0.1:5000/delete-inventory',
						{ 'name': oldData['name'] },
						{withCredentials: true}
					).then((response) => {
						setData(JSON.parse(response.data.inventory));
					}).catch((err) => {
					  alert(err.response.data.message);
					  console.log(err);
					});
					resolve();
				  })
			  }}
    />
      </ThemeProvider>
    </div>
  );
};

export default InventoryManager;
