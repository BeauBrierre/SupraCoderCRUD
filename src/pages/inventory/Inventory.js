import React, { useState, forwardRef, useEffect } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import InventoryPublic from './InventoryPublic';
import InventoryManager from './InventoryManager';
import axios from 'axios';

//sets background color to silver
document.body.style = 'background: silver;';

//establish components of table organization
const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

const Inventory = ({user, setUser}) => {
	const [data, setData] = useState(() => []);

	//use axios to get the data from the database, then manage said data
	useEffect(() => {
		axios.get(
			'http://127.0.0.1:5000/get-inventory',
			{withCredentials: true}
		).then((response) => {
			setData(JSON.parse(response.data.inventory));
		}).catch((err) => {
		  alert(err.response.data.message);
		  console.log(err);
		});
	  }, []);

	//layout of table columns
	const columns = [
		{ title: 'Item Name', field: 'name', width: '30%' },
		{ title: 'Quantity', field: 'quantity', type: 'numeric', width: '30%' },
		{ title: 'Description', field: 'description', width: '30%' },
	  ];

	//establish the building of the table based on whether or not the user is signed in
	const table = () => {
		if (user.length > 0) return <InventoryManager user={user} setUser={setUser} tableIcons={tableIcons} columns={columns} data={data} setData={setData}/>;
		else return <InventoryPublic tableIcons={tableIcons} columns={columns} data={data}/>;
	}

	//activate the table
	return (
		<div>
			{table()}
		</div>
	)
};

export default Inventory;
