import React from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import _ from 'lodash';
import { ISalesSuggestion } from './types';
import {List, ListItem, ListItemText} from '@material-ui/core';
import { useStyles } from './styles';

const API_URL = './mocks/sales-data.json';

export const SalesListTable = (): React.ReactElement => {
    const [salesData, setSalesData] = React.useState<ISalesSuggestion[]>([]);
    const classes = useStyles();

    React.useEffect(() => {
        axios.get(API_URL)
        .then((result: any) => {
            const salesSuggestions: ISalesSuggestion[] = result.data.suggestions;
            salesSuggestions.forEach((item: ISalesSuggestion) => {
                return item['id'] = _.uniqueId('sale-id-');
            })
            setSalesData(salesSuggestions);
        })
        .catch((error) => console.error('There is error in API', error))
    }, []);

    const columns = [
        { title: 'Name', field: 'title' },
        { title: 'Suggestions', field: 'text', render: (rowData: any) => {
            return (
                <List subheader={<li />}>
                    <li key={`section-${rowData.tableData.id}`}>
                        <ul style={{padding: 0}}>
                            {rowData.text.map((item: any) => (
                            <ListItem key={`item-${rowData.tableData.id}-${item}`} className={classes.salesListItemContent}>
                                <ListItemText primary={`Item ${item}`} />
                            </ListItem>
                            ))}
                        </ul>
                    </li>
                </List>
            )
        } },
    ]

    return (
        <MaterialTable
            title="Sales Preview"
            columns={columns}
            data={salesData || []}        
            options={{
                search: true,
                actionsColumnIndex: -1,
                tableLayout: "auto",
            }}
              editable={{
                  //This is to add new record
                // onRowAdd: newData =>
                //   new Promise((resolve, _reject) => {
                //     setTimeout(() => {
                //         const updatedData = [...salesData, newData]
                //         setSalesData(updatedData);
                //         resolve(updatedData);
                //     }, 1000)
                //   }),
                onRowUpdate: (newData: any, oldData: any) =>
                  new Promise((resolve, _reject) => {
                    setTimeout(() => {
                      const dataUpdate = [...salesData];
                      const index = oldData.tableData.id;
                      dataUpdate[index] = newData;
                      setSalesData([...dataUpdate]);
                      resolve([...dataUpdate]);
                    }, 1000)
                  })
                }}
        />
    )
}