sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("ns01.moody.controller.Main", {
            onInit: function () {
                var oRootPath = jQuery.sap.getModulePath("ns01.moody"); // your resource root 
                var oImageModel = new sap.ui.model.json.JSONModel({ path : oRootPath, }); 
                this.getOwnerComponent().setModel(oImageModel, "imageModel");
                // this.setModel(oImageModel, "imageModel");
            },
            onPress: function () {
                var oModel = this.getView().getModel();
                var payload = {};
                var currentDate = new Date();
                let x = Date.now();
                let tmpTime = x.toString();
                payload.UserID = tmpTime.slice(8,13);
                payload.Crdat = currentDate;
                payload.Sleep = this.getView().byId("id_sleep").getValue();
                payload.Meeting = this.getView().byId("id_meet").getValue();
                payload.Travel = this.getView().byId("id_travel").getValue();
                payload.Hobbies = this.getView().byId("id_hobby").getValue();
                payload.PhyActvt = this.getView().byId("id_exrcs").getValue();                
                payload.WorkHour= this.getView().byId("id_work").getValue();  
                payload.IsActiveEntity = true;
                oModel.create("/UsrData", payload, {
                    success: function (oData, response){
                        var aiResponse = oData.Suggest;
                        this.getView().byId("area1").setValue(aiResponse);           
                    }.bind(this),
                    error: function(oError){
                       
                    }
                });
            },
            onPressWeekly: function () {
                var oModel = this.getView().getModel();
                var payload = {};
                var currentDate = new Date();
                let x = Date.now();
                let tmpTime = x.toString();
                payload.UserID = tmpTime.slice(8,13);
                payload.Crdat = currentDate;
                payload.Sleep = this.getView().byId("id_sleep").getValue();
                payload.Meeting = this.getView().byId("id_meet").getValue();
                payload.Travel = this.getView().byId("id_travel").getValue();
                payload.Hobbies = this.getView().byId("id_hobby").getValue();
                payload.PhyActvt = this.getView().byId("id_exrcs").getValue();                
                payload.WorkHour= this.getView().byId("id_work").getValue();
                payload.Suggest="Week"  
                payload.IsActiveEntity = true;
                oModel.create("/UsrData", payload, {
                    success: function (oData, response){
                        var aiResponse = oData.Suggest;
                        this.getView().byId("area1").setValue(aiResponse);           
                    }.bind(this),
                    error: function(oError){
                       
                    }
                });
            },
            pressFb: function() {
                window.location.href = "https://www.facebook.com";
            },
            pressZom: function() {
                window.location.href = "https://www.zomato.com";
            },
            pressSwiggy: function() {
                window.location.href = "https://www.Swiggy.com";
            },
            pressGaana: function() {
                window.location.href = "https://www.Gaana.com";
            },
            pressYT: function() {
                window.location.href = "https://www.Youtube.com";
            },
            pressInsta: function() {
                window.location.href = "https://www.Instagram.com";
            }
        });
    });
