'use strict';

angular.module('bahmni.clinical')
    .controller('ConceptSetPageController', ['$scope', '$rootScope', '$stateParams', 'conceptSetService',
        'clinicalAppConfigService', 'messagingService', 'configurations', '$state', 'spinner',
        'contextChangeHandler', '$q', '$translate', 'formService',
        function ($scope, $rootScope, $stateParams, conceptSetService,
                  clinicalAppConfigService, messagingService, configurations, $state, spinner,
                  contextChangeHandler, $q, $translate, formService) {
            $scope.consultation.selectedObsTemplate = $scope.consultation.selectedObsTemplate || [];
            $scope.allTemplates = $scope.allTemplates || [];
            $scope.scrollingEnabled = false;
            var extensions = clinicalAppConfigService.getAllConceptSetExtensions($stateParams.conceptSetGroupName);
            var configs = clinicalAppConfigService.getAllConceptsConfig();
            var visitType = configurations.encounterConfig().getVisitTypeByUuid($scope.consultation.visitTypeUuid);
            $scope.context = {visitType: visitType, patient: $scope.patient};
            var numberOfLevels = 2;
            var fields = ['uuid', 'name:(name,display)', 'names:(uuid,conceptNameType,name)'];
            var customRepresentation = Bahmni.ConceptSet.CustomRepresentationBuilder.build(fields, 'setMembers', numberOfLevels);
            var allConceptSections = [];
            var historyAndExaminitionsUUID = "c393fd1d-3f10-11e4-adec-0800271c1b75";
            var vitalsUUID = "c36a7537-3f10-11e4-adec-0800271c1b75";
            var SecondVitals = "c38669d1-3f10-11e4-adec-0800271c1b75";
            var Obstetrics = "c44f4ba3-3f10-11e4-adec-0800271c1b75";
            var Gynaecology = "c45d1339-3f10-11e4-adec-0800271c1b75";
            var DischargeSummary = "c389d0ea-3f10-11e4-adec-0800271c1b75";
            var TuberclosisIntakeTemplate = "e95b2fd4-8956-474e-8e0e-630932f6ecee";
            var TuberclosisFolloupTemplate = "4276dcf6-0f21-4910-bac3-87ddc94f88c9";
            var ANC = "18351dd1-078e-456c-8c23-915b16e9dfaf";
            var DiabetesIntake = "ec27d7a3-c9bc-44ee-80b9-b998db3e278a";
            var DiabetesProgress = "957f4eb6-1193-4303-aab2-add4e966d1b1";
            var HypertensionIntake = "b98107dc-fb15-499c-8bb2-41b9a7f16c28";
            var HypertensionProgress = "da8e93dd-f59c-4c1d-b4c7-7bcd48c49e95";
            var Malaria = "58370446-3439-4007-a6bc-4d6687c8d354";
            var DeathNote = "208c3975-77f7-43bb-aca3-b5ffa9c1bfcc";
            var DeliveryNote = "199720f7-eb6e-491f-ac8e-b1eca6faee0d";
            var ChildhoodIllnessbelow2months = "68956dcb-e407-4fd6-ac5a-b243c57a3a28";
            var ChildhoodIllnessBetween = "7963985f-5740-4b35-953d-c48a987cd72e";
            var IMAMProgram = "532ae9c8-9b95-4b7f-b22e-9fffe0810d7c";
            var Nutrition = "d2e964c9-c546-4444-8fca-5179a22c8b31";
            var HIVTestingAndCounselingIntakeTemplate = "6bfd85ce-22c8-4b54-af0e-ab0af24240e3";
            var HIVTreatmentAndCareIntakeTemplate = "03a7cac1-2562-4151-9f3e-8f07c6c94731";
            var HIVTreatmentandCareProgressTemplate = "746818ac-65a0-4d74-9609-ddb2c330a31b";
            var OpioidSubstitutionTherapyIntakeTemplate = "63a42108-5647-4884-a4f3-f8e74d7e9f70";
            var OpportunisticInfectionTemplate = "f8ce62bf-315a-47ba-b085-b896f00e4c31";
            var PreventionofMotherChildTransmissionIntakeTemplate = "c1eda433-7d3d-4c58-901b-587a7ddbc870";
            var SafeAbortion = "1e55759a-04ca-4c6f-9d26-d7fbf1497e34";
            var PNC = "ef29ac41-47c9-4f4d-9f53-0d4e797b9fef";
            var FamilyPlanningTemplate = "8d62f476-8b96-4dde-8452-2d4d5742a817";
            var PostDeliveryFamilyPlanningChecklist = "981ee726-d61d-4e85-b411-99e7682f75a4";
            var ChronicKidneyDeseaseIntake = "a1a77be7-8cfb-4c7c-957e-979285c1ccde";
            var ChronicKidneyDiseaseProgress = "b84304cb-5cb2-412f-ab7c-0df9cef91195";
            var COPDIntake = "5a0157fb-73e4-4094-9480-a3e35e6e0a43";
            var COPDProgress = "0f2daa04-8c51-4aa7-97e9-83cece626a36";
            var AsthmaProgress = "fe0b2622-dc21-4c37-841b-36c234329cb0";
            var CongestiveHeartFailureProgress = "496e596d-b703-4f06-9303-d6f3b2ebf8e5";
            var CoronaryArteryDiseaseProgress = "5728d998-b57d-4d2f-9d78-c742bc56a7bd";
            var RheumaticHeartDiseaseProgress = "40c461f7-1c27-4ac8-8ef5-68ad8f6a458a";
            var SeizureDisorderProgress = "67a7b81a-2944-4da0-8b4e-99c808d4f387";
            var StrokeOPD = "c2d65529-ad8d-4ca0-a7f8-417c25774618";
            var LeprosyTemplate = "bdc9b494-b53f-4799-83ce-5872efe81d44";
            var MentalHealth = "fec90bd6-5d2a-4577-8247-4cae93316fc1";
            var OrthopaedicExamination = "f5d4b684-05d0-427f-b32b-ca9c65430727";
            var ECGNotes = "3f6c1dbc-1841-494a-a548-32a489988732";
            var ERGeneralNotes = "d262e419-1b95-45f2-91c8-9e70e237795a";
            var OperativeNotes = "f3d7969c-e9c7-4c7a-9b4f-278617212c3f";
            var USGNotes = "285604a9-6e8b-4029-9af6-947a1f0a2e17";
            var ProcedureNotes = "930adbff-e6c9-44b6-a717-b9dfc678dd9e";
            var TraumaNotes = "66b8168a-2284-4f48-b134-8131c0d65cfe";
            var BreastCancerFollowupTemplate = "198d7651-e7ee-4693-bcba-154a5d005741";
            var BreastCancerIntakeTemplate = "eba06fb1-846a-44bf-9885-322f6aa28b0e";

            var init = function () {
                if (!($scope.allTemplates !== undefined && $scope.allTemplates.length > 0)) {
                    spinner.forPromise(conceptSetService.getConcept({
                        name: "All Observation Templates",
                        v: "custom:" + customRepresentation
                    }).then(function (response) {
                        var allTemplates = response.data.results[0].setMembers;
                        var privileges = $rootScope.currentUser.privileges;
                        for (var i = privileges.length - 1; i >= 0; i--) {
                            // console.log("Current user privilege::", privileges[i].name);
                            var userPrivilege = privileges[i].name;
                            if (userPrivilege == "Doctor") {
                                for (var i = allTemplates.length - 1; i >= 0; i--) {
                                    if (allTemplates[i].uuid == historyAndExaminitionsUUID || allTemplates[i].uuid == vitalsUUID) {
                                        allTemplates.splice(i, 1);
                                    }
                                }
                            } else if (userPrivilege == "Nurse") {
                                for (var i = allTemplates.length - 1; i >= 0; i--) {
                                    if (allTemplates[i].uuid === SecondVitals || allTemplates[i].uuid === Obstetrics || allTemplates[i].uuid == Gynaecology || allTemplates[i].uuid == Obstetrics || allTemplates[i].uuid == DischargeSummary || allTemplates[i].uuid == TuberclosisIntakeTemplate || allTemplates[i].uuid == TuberclosisFolloupTemplate || allTemplates[i].uuid == ANC ||
                                        allTemplates[i].uuid === DiabetesIntake || allTemplates[i].uuid === DiabetesProgress || allTemplates[i].uuid === HypertensionIntake || allTemplates[i].uuid == HypertensionProgress || allTemplates[i].uuid == Malaria || allTemplates[i].uuid == DeathNote || allTemplates[i].uuid == DeliveryNote ||
                                        allTemplates[i].uuid === ChildhoodIllnessbelow2months || allTemplates[i].uuid === ChildhoodIllnessBetween || allTemplates[i].uuid == IMAMProgram || allTemplates[i].uuid == Nutrition || allTemplates[i].uuid == HIVTestingAndCounselingIntakeTemplate || allTemplates[i].uuid == HIVTreatmentAndCareIntakeTemplate || allTemplates[i].uuid == HIVTreatmentandCareProgressTemplate || allTemplates[i].uuid == OpioidSubstitutionTherapyIntakeTemplate ||
                                        allTemplates[i].uuid === OpportunisticInfectionTemplate || allTemplates[i].uuid === PreventionofMotherChildTransmissionIntakeTemplate || allTemplates[i].uuid == SafeAbortion || allTemplates[i].uuid == PNC || allTemplates[i].uuid == FamilyPlanningTemplate || allTemplates[i].uuid == PostDeliveryFamilyPlanningChecklist || allTemplates[i].uuid == ChronicKidneyDeseaseIntake || allTemplates[i].uuid == ChronicKidneyDiseaseProgress || allTemplates[i].uuid == COPDIntake ||
                                        allTemplates[i].uuid === COPDProgress || allTemplates[i].uuid === AsthmaProgress || allTemplates[i].uuid == CongestiveHeartFailureProgress || allTemplates[i].uuid == CoronaryArteryDiseaseProgress || allTemplates[i].uuid == StrokeOPD || allTemplates[i].uuid == LeprosyTemplate ||
                                        allTemplates[i].uuid === RheumaticHeartDiseaseProgress || allTemplates[i].uuid === SeizureDisorderProgress || allTemplates[i].uuid == MentalHealth || allTemplates[i].uuid == OrthopaedicExamination || allTemplates[i].uuid == ECGNotes || allTemplates[i].uuid == ERGeneralNotes || allTemplates[i].uuid == OperativeNotes || allTemplates[i].uuid == ProcedureNotes ||
                                        allTemplates[i].uuid === USGNotes || allTemplates[i].uuid == TraumaNotes || allTemplates[i].uuid === BreastCancerFollowupTemplate || allTemplates[i].uuid == BreastCancerIntakeTemplate) {
                                        allTemplates.splice(i, 1);
                                    }
                                }
                            }
                        }
                        createConceptSections(allTemplates);
                        if ($state.params.programUuid) {
                            showOnlyTemplatesFilledInProgram();
                        }

                        // Retrieve Form Details
                        if (!($scope.consultation.observationForms !== undefined && $scope.consultation.observationForms.length > 0)) {
                            spinner.forPromise(formService.getFormList($scope.consultation.encounterUuid)
                                .then(function (response) {
                                    $scope.consultation.observationForms = getObservationForms(response.data);
                                    concatObservationForms();
                                })
                            );
                        } else {
                            concatObservationForms();
                        }
                    }));
                }
            };
            var concatObservationForms = function () {
                $scope.allTemplates = getSelectedObsTemplate(allConceptSections);
                $scope.uniqueTemplates = _.uniqBy($scope.allTemplates, 'label');
                $scope.allTemplates = $scope.allTemplates.concat($scope.consultation.observationForms);
                if ($scope.consultation.selectedObsTemplate.length == 0) {
                    initializeDefaultTemplates();
                    if ($scope.consultation.observations && $scope.consultation.observations.length > 0) {
                        addTemplatesInSavedOrder();
                    }
                    var templateToBeOpened = getLastVisitedTemplate() ||
                        _.first($scope.consultation.selectedObsTemplate);

                    if (templateToBeOpened) {
                        openTemplate(templateToBeOpened);
                    }
                }
            };

            var addTemplatesInSavedOrder = function () {
                var templatePreference = JSON.parse(localStorage.getItem("templatePreference"));
                if (templatePreference && templatePreference.patientUuid === $scope.patient.uuid &&
                    !_.isEmpty(templatePreference.templates) && $rootScope.currentProvider.uuid === templatePreference.providerUuid) {
                    insertInSavedOrder(templatePreference);
                } else {
                    insertInDefaultOrder();
                }
            };

            var insertInSavedOrder = function (templatePreference) {
                var templateNames = templatePreference.templates;
                _.each(templateNames, function (templateName) {
                    var foundTemplates = _.filter($scope.allTemplates, function (allTemplate) {
                        return allTemplate.conceptName === templateName;
                    });
                    if (foundTemplates.length > 0) {
                        _.each(foundTemplates, function (template) {
                            if (!_.isEmpty(template.observations)) {
                                insertTemplate(template);
                            }
                        });
                    }
                });
            };

            var insertInDefaultOrder = function () {
                _.each($scope.allTemplates, function (template) {
                    if (template.observations.length > 0) {
                        insertTemplate(template);
                    }
                });
            };

            var insertTemplate = function (template) {
                if (template && !(template.isDefault() || template.alwaysShow)) {
                    $scope.consultation.selectedObsTemplate.push(template);
                }
            };

            var getLastVisitedTemplate = function () {
                return _.find($scope.consultation.selectedObsTemplate, function (template) {
                    return template.id === $scope.consultation.lastvisited;
                });
            };

            var openTemplate = function (template) {
                template.isOpen = true;
                template.isLoaded = true;
                template.klass = "active";
            };

            var initializeDefaultTemplates = function () {
                $scope.consultation.selectedObsTemplate = _.filter($scope.allTemplates, function (template) {
                    return template.isDefault() || template.alwaysShow;
                });
            };

            $scope.filterTemplates = function () {
                $scope.uniqueTemplates = _.uniqBy($scope.allTemplates, 'label');
                if ($scope.consultation.searchParameter) {
                    $scope.uniqueTemplates = _.filter($scope.uniqueTemplates, function (template) {
                        return _.includes(template.label.toLowerCase(), $scope.consultation.searchParameter.toLowerCase());
                    });
                }
                return $scope.uniqueTemplates;
            };

            var showOnlyTemplatesFilledInProgram = function () {
                spinner.forPromise(conceptSetService.getObsTemplatesForProgram($state.params.programUuid).success(function (data) {
                    if (data.results.length > 0 && data.results[0].mappings.length > 0) {
                        _.map(allConceptSections, function (conceptSection) {
                            conceptSection.isAdded = false;
                            conceptSection.alwaysShow = false;
                        });

                        _.map(data.results[0].mappings, function (template) {
                            var matchedTemplate = _.find(allConceptSections, {uuid: template.uuid});
                            if (matchedTemplate) {
                                matchedTemplate.alwaysShow = true;
                            }
                        });
                    }
                }));
            };

            var createConceptSections = function (allTemplates) {
                _.map(allTemplates, function (template) {
                    var conceptSetExtension = _.find(extensions, function (extension) {
                        return extension.extensionParams.conceptName === template.name.name;
                    }) || {};
                    var conceptSetConfig = configs[template.name.name] || {};
                    var observationsForTemplate = getObservationsForTemplate(template);
                    if (observationsForTemplate && observationsForTemplate.length > 0) {
                        _.each(observationsForTemplate, function (observation) {
                            allConceptSections.push(new Bahmni.ConceptSet.ConceptSetSection(conceptSetExtension, $rootScope.currentUser, conceptSetConfig, [observation], template));
                        });
                    } else {
                        allConceptSections.push(new Bahmni.ConceptSet.ConceptSetSection(conceptSetExtension, $rootScope.currentUser, conceptSetConfig, [], template));
                    }
                });
            };

            var collectObservationsFromConceptSets = function () {
                $scope.consultation.observations = [];
                _.each($scope.consultation.selectedObsTemplate, function (conceptSetSection) {
                    if (conceptSetSection.observations[0]) {
                        $scope.consultation.observations.push(conceptSetSection.observations[0]);
                    }
                });
            };

            var getObservationsForTemplate = function (template) {
                return _.filter($scope.consultation.observations, function (observation) {
                    return !observation.formFieldPath && observation.concept.uuid === template.uuid;
                });
            };

            var getSelectedObsTemplate = function (allConceptSections) {
                return allConceptSections.filter(function (conceptSet) {
                    if (conceptSet.isAvailable($scope.context)) {
                        return true;
                    }
                });
            };

            $scope.stopAutoClose = function ($event) {
                $event.stopPropagation();
            };

            $scope.addTemplate = function (template) {
                $scope.scrollingEnabled = true;
                $scope.showTemplatesList = false;
                var index = _.findLastIndex($scope.consultation.selectedObsTemplate, function (consultationTemplate) {
                    return consultationTemplate.label == template.label;
                });

                if (index != -1 && $scope.consultation.selectedObsTemplate[index].allowAddMore) {
                    var clonedObj = template.clone();
                    clonedObj.klass = "active";
                    $scope.consultation.selectedObsTemplate.splice(index + 1, 0, clonedObj);
                } else {
                    template.toggle();
                    template.klass = "active";
                    if (index > -1) {
                        $scope.consultation.selectedObsTemplate[index] = template;
                    } else {
                        $scope.consultation.selectedObsTemplate.push(template);
                    }
                }
                $scope.consultation.searchParameter = "";
                messagingService.showMessage("info", $translate.instant("CLINICAL_TEMPLATE_ADDED_SUCCESS_KEY", {label: template.label}));
            };

            $scope.getNormalized = function (conceptName) {
                return conceptName.replace(/['\.\s\(\)\/,\\]+/g, "_");
            };

            $scope.consultation.preSaveHandler.register("collectObservationsFromConceptSets", collectObservationsFromConceptSets);
            // Form Code :: Start
            var getObservationForms = function (observationsForms) {
                var forms = [];
                var observations = $scope.consultation.observations || [];
                _.each(observationsForms, function (observationForm) {
                    var formUuid = observationForm.formUuid || observationForm.uuid;
                    var formName = observationForm.name || observationForm.formName;
                    var formVersion = observationForm.version || observationForm.formVersion;
                    var privileges = observationForm.privileges;
                    var labels = observationForm.nameTranslation ? JSON.parse(observationForm.nameTranslation) : [];
                    var label = formName;
                    if (labels.length > 0) {
                        var locale = localStorage.getItem("NG_TRANSLATE_LANG_KEY") || "en";
                        var currentLabel = labels.find(function (label) {
                            return label.locale === locale;
                        });
                        if (currentLabel) { label = currentLabel.display; }
                    }
                    if ($scope.isFormEditableByTheUser(observationForm)) {
                        var newForm = new Bahmni.ObservationForm(formUuid, $rootScope.currentUser,
                                                                   formName, formVersion, observations, label);
                        newForm.privileges = privileges;
                        forms.push(newForm);
                    }
                });

                return forms;
            };
            $scope.isFormEditableByTheUser = function (form) {
                var result = false;
                if ((typeof form.privileges != 'undefined') && (form.privileges != null) && (form.privileges.length != 0)) {
                    form.privileges.forEach(function (formPrivilege) {
                        _.find($rootScope.currentUser.privileges, function (privilege) {
                            if (formPrivilege.privilegeName === privilege.name) {
                                if (formPrivilege.editable) {
                                    result = formPrivilege.editable;
                                } else {
                                    if (formPrivilege.viewable) {
                                        result = true;
                                    }
                                }
                            }
                        });
                    });
                } else { result = true; }
                return result;
            };

            // Form Code :: End
            init();
        }]);
