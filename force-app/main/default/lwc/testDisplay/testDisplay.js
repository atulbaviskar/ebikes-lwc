import { LightningElement ,track} from 'lwc';
import saveAccount from '@salesforce/apex/OrderController.saveAccountRecord';
// importing to show toast notifictions
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
// importing Account fields
import NAME_FIELD from '@salesforce/schema/Account.Name';
import Phone_FIELD from '@salesforce/schema/Account.Phone';
import Industry_FIELD from '@salesforce/schema/Account.Industry';
import Type_FIELD from '@salesforce/schema/Account.Type';
import { NavigationMixin } from 'lightning/navigation';


export default class TestDisplay extends LightningElement {

@track error;

// this object have record information
@track accRecord = {
    Name : NAME_FIELD,
    Industry : Industry_FIELD,
    Phone : Phone_FIELD,
    Type : Type_FIELD
};

@track IsCheck = false;


handleNameChange(event) {
    this.accRecord.Name = event.target.value;
    window.console.log('Name ==> '+this.accRecord.Name);
}

handlePhoneChange(event) {
    this.accRecord.Phone = event.target.value;
    window.console.log('Phone ==> '+this.accRecord.Phone);
}

handleTypeChange(event) {
    this.accRecord.Type = event.target.value;
    window.console.log('Type ==> '+this.accRecord.Type);
}

handleIndustryChange(event) {
    this.accRecord.Industry = event.target.value;
    window.console.log('Industry ==> '+this.accRecord.Industry);
}
handlecheckboxChange(event) {
    this.IsCheck = event.target.checked;
    window.console.log('Industry ==> '+this.IsCheck);
}
handleNext() {
    this[NavigationMixin.Navigate]({
        type: 'comm__namedPage',
        attributes: {
            apiName: 'create-case'
        }
    });
}



handleSave() {
    saveAccount({objAcc: this.accRecord})
    .then(result => {
        // Clear the user enter values
        this.accRecord = {};

        window.console.log('result ===> '+result);
        // Show success messsage
        this.dispatchEvent(new ShowToastEvent({
            title: 'Success!!',
            message: 'Account Created Successfully!!',
            variant: 'success'
        }),);
    })
    .catch(error => {
        this.error = error.message;
    });
}

}