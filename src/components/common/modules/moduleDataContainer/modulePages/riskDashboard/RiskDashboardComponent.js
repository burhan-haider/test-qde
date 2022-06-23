import {useState, useEffect} from 'react'
import {
    DialogContent,
    Grid,
    FormControl,
    TextField,
    DialogActions,
    MenuItem
} from "@mui/material";
import { GenericButton } from "@application";
import Formsy from "formsy-react";
import { TextFieldFormsy, SelectFormsy, DatePickerFormsy } from "components/common/formsyComponents";
import { useClasses } from '@application';
import moment from 'moment';
import httpService from 'services/httpservice/httpService'

const RiskDashboardComponent = () => {

    const listData = [
        "Monthly",
        "Quarterly",
        "Daily",
        "MIS1",
        "CDDMIS"
    ];

    let list = "";

    const token = window.localStorage.getItem("cognifi_token");
    let config = {
        headers: {
            Authorization: "Bearer " + token,
            'Content-Type': `multipart/form-data`,
        }
    };

    const handleSubmit = async(data) => {

        console.log("Form Data:-", data)

        const formData = new FormData();

        formData.append("FromDate", data.FromDate);
        formData.append("ToDate", data.ToDate);
        formData.append("ReportFrequency", data.ReportFrequency);

        await httpService
            .post("/reports/getConsolidatedReportTabView",  formData, config)
            .then(response => {
            console.log("API Response",response)
            })
            .catch(err=>{
                console.log(err);
            });
    }

    return(
        <div>
            <Formsy onValidSubmit={data=>handleSubmit(data)} >
                <Grid container className="py-5 container">
                    <Grid item sm={3}>
                        <DatePickerFormsy
                            variant="outlined"
                            name={`FromDate`}
                            label={`From`}
                            ampm={false} // 24Hr / 12hr clock settings
                            className={undefined} // optional, if you need for styling
                            dateTime={false} // true, if need the Date and Time Picker. false if you need only Date Picker
                            allowKeyboardControl={true} // optional, this will allow keybord to control the picker.
                            value={moment(new Date()).format('L')}
                        />
                    </Grid>
                    <Grid item sm={3}>
                        <DatePickerFormsy
                            variant="outlined"
                            name={`ToDate`}
                            label={`To`}
                            ampm={false} // 24Hr / 12hr clock settings
                            className={undefined} // optional, if you need for styling
                            dateTime={false} // true, if need the Date and Time Picker. false if you need only Date Picker
                            allowKeyboardControl={true} // optional, this will allow keybord to control the picker.
                            value={moment(new Date()).format('L')}
                        />
                    </Grid>
                    <Grid item sm={3} >
                        <SelectFormsy 
                            variant="outlined"
                            name="ReportFrequency"
                            label="List"
                            className={"w-5/6 text-left"}
                            required={true}
                            value={list}
                        >
                            {/* <option aria-label="None" disabled value="" /> */}
                            {listData.map((item, index) => {
                                return (
                                <MenuItem key={index} value={item}>
                                    {item}
                                </MenuItem>
                                );
                            })}
                        </SelectFormsy>
                    </Grid>
                    <Grid item sm={3} className="text-left align-middle">
                        <GenericButton
                            color="primary"
                            type="submit"
                            className="px-10"
                        >
                            Search
                        </GenericButton>
                    </Grid>
                </Grid>
            </Formsy>
        </div>
    )

}

export default RiskDashboardComponent