import React from 'react';
import MaterialTable from 'material-table';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import styles from './Inventory.module.css';

//sets background color to silver
document.body.style = 'background: silver;';

//establish all visitor opportunities
const InventoryPublic = ({tableIcons, data, columns}) => {
  const tableRef = React.createRef();
  const navigate = useNavigate();
  const defaultMaterialTheme = createTheme();


  return (
    <div>
      {/* establish ability to sign into manager account */}
      <ThemeProvider theme={defaultMaterialTheme}>
	  		<div className={styles.subBanner}>
				<p className={styles.textRight} onClick={() => {navigate('/login', { replace: true })}}>***Sign in to update inventory***</p>
			</div>
        {/* lay out table */}
      	<MaterialTable
        tableRef={tableRef}
        columns={columns}
        data={data}
		icons={tableIcons}
        title='Inventory'
		options={{
			tableLayout: 'auto'
		  }}	
    />
      </ThemeProvider>
    </div>
  );
};

export default InventoryPublic;
