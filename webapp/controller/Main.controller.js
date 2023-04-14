sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast) {
        "use strict";

        return Controller.extend("ns01.moody.controller.Main", {
            onInit: function () {
                var oRootPath = jQuery.sap.getModulePath("ns01.moody"); // your resource root 
                var oImageModel = new sap.ui.model.json.JSONModel({ "path": oRootPath, });
                this.getOwnerComponent().setModel(oImageModel, "imageModel");
                this.getView().byId("id_sleep").focus();
                var smileyPath = this.getOwnerComponent().getModel("imageModel").getData().path;
                var HappyPath = smileyPath + "/picture/health.png";
                this.getView().byId("smiley").setWidth("109%");
                this.getView().byId("smiley").setSrc(HappyPath);
            },
            onPress: function () {
                var oScreen = this.getView();
                oScreen.setBusy(true);
                // this.getView().byId("pie").setVisible(false);
                // this.getView().byId("chartContainer").setVisible(true);
                // this.getView().byId("pie").setWidth("0%");
                // this.getView().byId("chartContainer").setWidth("100%");
                var oModel = this.getView().getModel();
                var payload = {};
                var currentDate = new Date();
                let x = Date.now();
                let tmpTime = x.toString();
                payload.UserID = tmpTime;
                payload.Crdat = currentDate;
                payload.Sleep = this.getView().byId("id_sleep").getValue();
                payload.Meeting = this.getView().byId("id_meet").getValue();
                payload.Travel = this.getView().byId("id_travel").getValue();
                payload.Hobbies = this.getView().byId("id_hobby").getValue();
                payload.PhyActvt = this.getView().byId("id_exrcs").getValue();
                payload.WorkHour = this.getView().byId("id_work").getValue();
                payload.Others = this.getView().byId("id_other").getValue();
                payload.IsActiveEntity = true;
                oModel.create("/UsrData", payload, {
                    success: function (oData, response) {
                        var toastSuccess = "Response Generated Successfully";
                        var oScrollContainer = this.getView().byId("page");
                        oScrollContainer.scrollTo(0, oScrollContainer.$().height());
                        this.getView().byId("panel1").setExpanded(true);
                        this.getView().byId("area1").focus();
                        this.getView().byId("area1").getDomRef().scrollIntoView();
                        MessageToast.show(toastSuccess);
                        var aiResponse = oData.Suggest;
                        this.getView().byId("area1").setText(aiResponse);
                        //pie chart code
                        var ovalues = {
                            values:
                                [{ category: "Sleep Time", value: oData.Sleep },
                                { category: "Screen Time", value: oData.Meeting },
                                { category: "Commute Time", value: oData.Travel },
                                { category: "WorkOut Time", value: oData.PhyActvt },
                                { category: "Leisure Time", value: oData.Hobbies },
                                { category: "Job Time", value: oData.WorkHour }]
                        };
                        var smileyPath = this.getView().getModel("imageModel").getData().path;
                        this.getView().byId("smiley").setWidth("60%");
                        if (oData.MentalScore >= 8) {
                            var HappyPath = smileyPath + "/picture/happy.png";
                            this.getView().byId("smiley").setSrc(HappyPath);
                        }
                        else if (oData.MentalScore >= 5 && oData.MentalScore <= 7) {
                            var NeutralPath = smileyPath + "/picture/neutral.png";
                            this.getView().byId("smiley").setSrc(NeutralPath);
                        }
                        else if (oData.MentalScore >= 1 && oData.MentalScore <= 4) {
                            var SadPath = smileyPath + "/picture/sad.png";
                            this.getView().byId("smiley").setSrc(SadPath);
                        }
                        var scoreTxt = "Your Wellness Score";
                        this.getView().byId("scoreText").setText(scoreTxt);

                        var scoreNum = oData.MentalScore + "/10";
                        this.getView().byId("scoreNumber").setText(scoreNum);

                        var oJsonModel = new sap.ui.model.json.JSONModel();
                        oJsonModel.setData(ovalues);
                        this.pieChartCreate(oJsonModel); //function call to create pie chart
                        this.getView().byId("idPieChart").removeAllFeeds();
                        oScreen.setBusy(false);
                    }.bind(this),
                    error: function (oError) {
                        oScreen.setBusy(false);
                        var toastFail = "Failed to Generate response from AI";
                        MessageToast.show(toastFail);
                    }
                });
            },
            onPressWeekly: function () {
                var oScreen = this.getView();
                oScreen.setBusy(true);
                var oModel = this.getView().getModel();
                var payload = {};
                var currentDate = new Date();
                let x = Date.now();
                let tmpTime = x.toString();
                this.onPressReset();
                payload.UserID = tmpTime;
                payload.Crdat = currentDate;
                payload.Suggest = "Week"
                payload.IsActiveEntity = true;
                oModel.create("/UsrData", payload, {
                    success: function (oData, response) {
                        oScreen.setBusy(false);
                        this.getView().byId("panel1").setExpanded(true);
                        this.getView().byId("area1").focus();
                        var aiResponse = oData.Suggest;
                        this.getView().byId("area1").setText(aiResponse);
                        //pie chart code
                        var ovalues = {
                            values:
                                [{ category: "Sleep Time", value: oData.Sleep },
                                { category: "Screen Time", value: oData.Meeting },
                                { category: "WorkOut Time", value: oData.WorkHour },
                                { category: "Commute Time", value: oData.Travel },
                                { category: "WorkOut Time", value: oData.PhyActvt },
                                { category: "Leisure Time", value: oData.Hobbies },
                                { category: "Job Time", value: oData.WorkHour }]
                        };

                        var oJsonModel = new sap.ui.model.json.JSONModel();
                        oJsonModel.setData(ovalues);
                        this.pieChartCreate(oJsonModel); //function call to create pie chart
                        this.getView().byId("idPieChart").removeAllFeeds();

                        // Smiley Logic 
                        var smileyPath = this.getView().getModel("imageModel").getData().path;
                        this.getView().byId("smiley").setWidth("60%");
                        if (oData.MentalScore >= 8) {
                            var HappyPath = smileyPath + "/picture/happy.png";
                            this.getView().byId("smiley").setSrc(HappyPath);
                        }
                        else if (oData.MentalScore >= 5 && oData.MentalScore <= 7) {
                            var NeutralPath = smileyPath + "/picture/neutral.png";
                            this.getView().byId("smiley").setSrc(NeutralPath);
                        }
                        else if (oData.MentalScore >= 1 && oData.MentalScore <= 4) {
                            var SadPath = smileyPath + "/picture/sad.png";
                            this.getView().byId("smiley").setSrc(SadPath);
                        }
                        var scoreTxt = "Your Wellness Score";
                        this.getView().byId("scoreText").setText(scoreTxt);

                        var scoreNum = oData.MentalScore + "/10";
                        this.getView().byId("scoreNumber").setText(scoreNum);
                    }.bind(this),
                    error: function (oError) {
                        oScreen.setBusy(false);

                    }
                });
            },
            onPressReset: function () {
                var smileyPath = this.getOwnerComponent().getModel("imageModel").getData().path;
                var HappyPath = smileyPath + "/picture/health.png";
                this.getView().byId("smiley").setWidth("120%");
                this.getView().byId("smiley").setSrc(HappyPath);
                this.getView().byId("scoreText").setText("");
                this.getView().byId("scoreNumber").setText("");
                this.getView().byId("id_sleep").setValue("");
                this.getView().byId("id_meet").setValue("");
                this.getView().byId("id_travel").setValue("");
                this.getView().byId("id_hobby").setValue("");
                this.getView().byId("id_exrcs").setValue("");
                this.getView().byId("id_work").setValue("");
                this.getView().byId("id_other").setValue("");

                this.getView().byId("panel1").setExpanded(false);
                this.getView().byId("area1").setText("");

                // Pie chart Reset 
                var ovalues = {
                    values:
                        [ ]
                };

                var oJsonModel = new sap.ui.model.json.JSONModel();
                oJsonModel.setData(ovalues);
                this.pieChartCreate(oJsonModel); //function call to create pie chart
                this.getView().byId("idPieChart").removeAllFeeds();
            },
            pressFb: function () {
                window.location.href = "https://www.facebook.com";
            },
            pressZom: function () {
                window.location.href = "https://www.zomato.com";
            },
            pressSwiggy: function () {
                window.location.href = "https://www.Swiggy.com";
            },
            pressGaana: function () {
                window.location.href = "https://www.Gaana.com";
            },
            pressYT: function () {
                window.location.href = "https://www.Youtube.com";
            },
            pressInsta: function () {
                window.location.href = "https://www.Instagram.com";
            },
            pieChartCreate: function (oJsonModel) {
                this.getView().byId("idPieChart").removeAllFeeds();
                this.getView().setModel(oJsonModel, "oJModel");
            }
        });
    });
