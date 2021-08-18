public with sharing class OrderController {
    @AuraEnabled(Cacheable=true)
    public static Order_Item__c[] getOrderItems(Id orderId) {
        return [
            SELECT
                Id,
                Qty_S__c,
                Qty_M__c,
                Qty_L__c,
                Price__c,
                Product__r.Name,
                Product__r.MSRP__c,
                Product__r.Picture_URL__c
            FROM Order_Item__c
            WHERE Order__c = :orderId
            WITH SECURITY_ENFORCED
        ];
    }
    @AuraEnabled
    public static void saveAccountRecord(Account objAcc){
        try{
            insert objAcc;
        }
        catch(Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }



}
