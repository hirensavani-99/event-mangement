import * as React from "react";
import { List, Datagrid, TextField, DateField, BooleanField } from 'react-admin';

const EventAdmin = (props) => {

    return (
        <List {...props}>
            <Datagrid>
                <TextField source="id" />

            </Datagrid>
        </List>
    )

};

export default EventAdmin;