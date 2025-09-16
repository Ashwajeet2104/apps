// MediCare+ JavaScript Application - Fixed Version
class MediCarePlus {
    constructor() {
        this.currentLanguage = 'english';
        this.currentTheme = 'light';
        this.currentSection = 'home';
        this.medicines = [];
        this.drugInteractions = [];
        this.foodInteractions = [];
        this.emergencyContacts = [];
        this.healthTips = [];
        this.commonFoods = [];
        this.reminders = [];
        this.medicalHistory = [];
        this.isVoiceActive = false;
        this.recognition = null;
        this.synthesis = null;
        this.currentTipCategory = 'all';
        
        this.translations = {
            english: {
                app_name: "MediCare+",
                home: "Home",
                medicines: "Medicines",
                drug_drug: "Drug-Drug",
                drug_food: "Drug-Food",
                reminders: "Reminders",
                history: "History",
                emergency: "Emergency",
                scanner: "Scanner",
                health_tips: "Health Tips",
                ai_assistant: "AI Assistant",
                welcome_title: "Welcome to MediCare+",
                welcome_subtitle: "Your comprehensive health companion for medicine information, interactions, and health management.",
                loading: "Loading...",
                listening: "Listening...",
                light_theme: "Light",
                dark_theme: "Dark",
                healthcare_theme: "Healthcare",
                search_medicines: "Search medicines...",
                all_categories: "All Categories",
                cardiovascular: "Cardiovascular",
                pain_relief: "Pain Relief",
                antibiotics: "Antibiotics",
                diabetes: "Diabetes",
                mental_health: "Mental Health",
                respiratory: "Respiratory",
                gastrointestinal: "Gastrointestinal",
                hormones: "Hormones",
                drug_drug_checker: "Drug-Drug Interaction Checker",
                drug_food_checker: "Drug-Food Interaction Checker",
                select_first_drug: "Select First Drug:",
                select_second_drug: "Select Second Drug:",
                select_drug: "Select Drug:",
                select_food: "Select Food:",
                choose_drug: "Choose a drug...",
                choose_food: "Choose a food...",
                check_interaction: "Check Interaction",
                medication_reminders: "Medication Reminders",
                add_reminder: "Add New Reminder",
                medicine_name: "Medicine Name:",
                dosage: "Dosage:",
                time: "Time:",
                frequency: "Frequency:",
                daily: "Daily",
                twice_daily: "Twice Daily",
                three_times: "Three Times Daily",
                medical_history: "Medical History",
                add_medical_record: "Add Medical Record",
                date: "Date:",
                condition: "Condition/Diagnosis:",
                prescription: "Prescription:",
                allergies: "Allergies:",
                notes: "Additional Notes:",
                save_record: "Save Record",
                emergency_contacts: "Emergency Contacts",
                prescription_scanner: "Prescription Scanner",
                upload_prescription: "Upload Prescription",
                upload_description: "Drag and drop or click to select prescription image or PDF",
                select_file: "Select File",
                analyze_prescription: "Analyze Prescription",
                ai_greeting: "Hello! I'm your MediCare+ AI Assistant. How can I help you with your health questions today?",
                medicare_assistant: "MediCare+ Assistant",
                online: "Online",
                ask_drug_info: "Tell me about a medicine",
                ask_side_effects: "Side effects of a drug",
                ask_interactions: "Check drug interactions",
                ask_dosage: "Dosage information",
                type_message: "Type your message...",
                ai_typing: "AI is typing",
                all_tips: "All Tips",
                general_health: "General Health",
                exercise: "Exercise",
                diet: "Diet"
            },
            marathi: {
                app_name: "मेडीकेअर+",
                home: "मुख्यपृष्ठ",
                medicines: "औषधे",
                drug_drug: "औषध-औषध",
                drug_food: "औषध-अन्न",
                reminders: "स्मरणपत्रे",
                history: "इतिहास",
                emergency: "आपत्कालीन",
                scanner: "स्कॅनर",
                health_tips: "आरोग्य सल्ले",
                ai_assistant: "AI सहाय्यक",
                welcome_title: "मेडीकेअर+ मध्ये आपले स्वागत",
                welcome_subtitle: "औषध माहिती, परस्परसंवाद आणि आरोग्य व्यवस्थापनासाठी आपला व्यापक आरोग्य साथीदार.",
                loading: "लोड होत आहे...",
                listening: "ऐकत आहे...",
                light_theme: "हलका",
                dark_theme: "गडद",
                healthcare_theme: "आरोग्य",
                search_medicines: "औषधे शोधा...",
                all_categories: "सर्व श्रेणी",
                cardiovascular: "हृदय व रक्तसंचार",
                pain_relief: "वेदनाशामक",
                antibiotics: "प्रतिजैविक",
                diabetes: "मधुमेह"
            },
            hindi: {
                app_name: "मेडीकेयर+",
                home: "होम",
                medicines: "दवाइयां",
                drug_drug: "दवा-दवा",
                drug_food: "दवा-भोजन",
                reminders: "रिमाइंडर",
                history: "इतिहास",
                emergency: "आपातकाल",
                scanner: "स्कैनर",
                health_tips: "स्वास्थ्य सुझाव",
                ai_assistant: "AI सहायक",
                welcome_title: "मेडीकेयर+ में आपका स्वागत है",
                welcome_subtitle: "दवा की जानकारी, इंटरेक्शन और स्वास्थ्य प्रबंधन के लिए आपका व्यापक स्वास्थ्य साथी।",
                loading: "लोड हो रहा है...",
                listening: "सुन रहा है...",
                light_theme: "हल्का",
                dark_theme: "डार्क",
                healthcare_theme: "स्वास्थ्य",
                search_medicines: "दवाइयां खोजें...",
                all_categories: "सभी श्रेणियां",
                cardiovascular: "हृदय संबंधी",
                pain_relief: "दर्द निवारक",
                antibiotics: "एंटीबायोटिक",
                diabetes: "मधुमेह"
            }
        };

        // Initialize immediately when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    async init() {
        console.log('Initializing MediCare+ App...');
        this.showLoading();
        
        try {
            await this.loadData();
            this.loadSavedData();
            this.setupEventListeners();
            this.setupVoiceRecognition();
            this.updateLanguage();
            this.renderCurrentSection();
            
            console.log('App initialized successfully');
        } catch (error) {
            console.error('Initialization error:', error);
        } finally {
            this.hideLoading();
        }
    }

    async loadData() {
        console.log('Loading data...');
        
        // Load fallback data immediately
        this.loadFallbackData();
        
        try {
            // Try to load external data, but don't fail if it doesn't work
            const responses = await Promise.allSettled([
                fetch('https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/5e1ed1fa1d00d04b5540809387c83819/6bb36247-4091-4e38-95a8-1ed9b2b207b1/be0c54b0.json'),
                fetch('https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/5e1ed1fa1d00d04b5540809387c83819/86e26f41-58a2-4947-a44e-c4fce3020fe5/509c1601.json'),
                fetch('https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/5e1ed1fa1d00d04b5540809387c83819/86e26f41-58a2-4947-a44e-c4fce3020fe5/4dcef353.json'),
                fetch('https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/5e1ed1fa1d00d04b5540809387c83819/86e26f41-58a2-4947-a44e-c4fce3020fe5/66bb63ac.json'),
                fetch('https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/5e1ed1fa1d00d04b5540809387c83819/86e26f41-58a2-4947-a44e-c4fce3020fe5/e767f1a5.json')
            ]);

            // Process successful responses
            for (let i = 0; i < responses.length; i++) {
                if (responses[i].status === 'fulfilled') {
                    try {
                        const data = await responses[i].value.json();
                        switch (i) {
                            case 0: // medicines
                                if (data.medicines) this.medicines = data.medicines;
                                break;
                            case 1: // drug interactions
                                if (data.interactions) this.drugInteractions = data.interactions;
                                break;
                            case 2: // food interactions
                                if (data.interactions) this.foodInteractions = data.interactions;
                                break;
                            case 3: // emergency contacts
                                if (data.categories) this.emergencyContacts = data.categories;
                                break;
                            case 4: // health tips
                                if (data.tips) this.healthTips = data.tips;
                                break;
                        }
                    } catch (e) {
                        console.warn(`Failed to parse data for resource ${i}:`, e);
                    }
                }
            }
        } catch (error) {
            console.warn('External data loading failed, using fallback data:', error);
        }
        
        console.log('Data loaded:', {
            medicines: this.medicines.length,
            drugInteractions: this.drugInteractions.length,
            emergencyContacts: this.emergencyContacts.length
        });
    }

    loadFallbackData() {
        this.medicines = [
            {
                id: 1,
                name: "Amlodipine (Norvasc)",
                category: "Cardiovascular",
                uses: {
                    english: "High blood pressure (hypertension), chest pain (angina), coronary artery disease",
                    marathi: "उच्च रक्तदाब (हायपरटेंशन), छातीत दुखणे (एंजाइना), कोरोनरी धमनी रोग",
                    hindi: "उच्च रक्तचाप (हाइपरटेंशन), सीने में दर्द (एनजाइना), कोरोनरी धमनी रोग"
                },
                advantages: {
                    english: "Long-acting, once daily dosing, effective for both hypertension and angina",
                    marathi: "दीर्घकालीन प्रभावी, दिवसातून एकदा घ्यावे लागते, उच्च रक्तदाब आणि एंजाइनासाठी प्रभावी",
                    hindi: "लंबे समय तक प्रभावी, दिन में एक बार लेना, उच्च रक्तचाप और एनजाइना के लिए प्रभावी"
                },
                disadvantages: {
                    english: "Ankle swelling, dizziness, fatigue, flushing, gum swelling",
                    marathi: "घोट्याची सूज, चक्कर येणे, थकवा, लाली, मसूड्यांची सूज",
                    hindi: "टखनों में सूजन, चक्कर आना, थकान, लालिमा, मसूड़ों की सूजन"
                },
                precautions: {
                    english: "Avoid in severe aortic stenosis, pregnancy category C, elderly need dose adjustment",
                    marathi: "गंभीर महाधमनी संकुचनामध्ये टाळावे, गर्भावस्थेत सावधगिरी, वृद्धांमध्ये डोस समायोजन",
                    hindi: "गंभीर महाधमनी संकुचन में बचें, गर्भावस्था में सावधानी, बुजुर्गों में खुराक समायोजन"
                },
                dosage: {
                    english: "Adults: 2.5-10mg once daily. Elderly: Start with 2.5mg daily",
                    marathi: "प्रौढ: दिवसातून एकदा 2.5-10mg. वृद्ध: दिवसातून 2.5mg पासून सुरुवात",
                    hindi: "वयस्क: दिन में एक बार 2.5-10mg. बुजुर्ग: दिन में 2.5mg से शुरुआत"
                }
            },
            {
                id: 2,
                name: "Lisinopril (Zestril, Prinivil)",
                category: "Cardiovascular",
                uses: {
                    english: "High blood pressure, heart failure, post-myocardial infarction",
                    marathi: "उच्च रक्तदाब, हृदय अपयश, हृदयविकाराच्या नंतर",
                    hindi: "उच्च रक्तचाप, दिल की कमजोरी, दिल के दौरे के बाद"
                },
                advantages: {
                    english: "Cardioprotective, renoprotective, once daily dosing",
                    marathi: "हृदयरक्षक, वृक्करक्षक, दिवसातून एकदा",
                    hindi: "हृदय सुरक्षाकारी, किडनी सुरक्षाकारी, दिन में एक बार"
                },
                disadvantages: {
                    english: "Dry cough (10-15%), hyperkalemia, angioedema (rare)",
                    marathi: "कोरडा खोकला (10-15%), हायपरकॅलेमिया, एंजिओएडेमा (दुर्मिळ)",
                    hindi: "सूखी खांसी (10-15%), हाइपरकैलेमिया, एंजियोएडेमा (दुर्लभ)"
                },
                precautions: {
                    english: "Avoid in pregnancy, bilateral renal artery stenosis",
                    marathi: "गर्भावस्थेत टाळावे, द्विपक्षीय वृक्क धमनी संकुचन",
                    hindi: "गर्भावस्था में बचें, द्विपक्षीय गुर्दे की धमनी संकुचन"
                },
                dosage: {
                    english: "Hypertension: 10-40mg daily. Heart failure: 2.5-35mg daily",
                    marathi: "उच्च रक्तदाब: दिवसातून 10-40mg. हृदय अपयश: दिवसातून 2.5-35mg",
                    hindi: "उच्च रक्तचाप: दिन में 10-40mg. दिल की कमजोरी: दिन में 2.5-35mg"
                }
            },
            {
                id: 3,
                name: "Acetaminophen (Tylenol)",
                category: "Pain Relief",
                uses: {
                    english: "Pain relief, fever reduction, headache, arthritis pain",
                    marathi: "वेदना कमी करणे, ताप कमी करणे, डोकेदुखी, संधिवात वेदना",
                    hindi: "दर्द निवारण, बुखार कम करना, सिरदर्द, गठिया दर्द"
                },
                advantages: {
                    english: "Safe in pregnancy, no gastric irritation, minimal drug interactions",
                    marathi: "गर्भावस्थेत सुरक्षित, गॅस्ट्रिक त्रास नाही, कमी औषध परस्परसंवाद",
                    hindi: "गर्भावस्था में सुरक्षित, पेट में जलन नहीं, कम दवा इंटरेक्शन"
                },
                disadvantages: {
                    english: "Liver toxicity with overdose, limited anti-inflammatory effect",
                    marathi: "जादा डोसने यकृत विषाक्तता, मर्यादित दाहक-विरोधी प्रभाव",
                    hindi: "अधिक खुराक से लिवर विषाक्तता, सीमित सूजन-विरोधी प्रभाव"
                },
                precautions: {
                    english: "Maximum 4g/day, avoid alcohol, caution in liver disease",
                    marathi: "दिवसातून जास्तीत जास्त 4g, दारू टाळावी, यकृत रोगामध्ये सावधगिरी",
                    hindi: "दिन में अधिकतम 4g, शराब से बचें, लिवर की बीमारी में सावधानी"
                },
                dosage: {
                    english: "Adults: 325-1000mg every 4-6 hours, max 4g/day",
                    marathi: "प्रौढ: दर 4-6 तासांनी 325-1000mg, जास्तीत जास्त 4g/दिवस",
                    hindi: "वयस्क: हर 4-6 घंटे में 325-1000mg, अधिकतम 4g/दिन"
                }
            },
            {
                id: 4,
                name: "Metformin (Glucophage)",
                category: "Diabetes",
                uses: {
                    english: "Type 2 diabetes mellitus, polycystic ovary syndrome (PCOS)",
                    marathi: "टाइप 2 मधुमेह, पॉलिसिस्टिक ओव्हरी सिंड्रोम (PCOS)",
                    hindi: "टाइप 2 मधुमेह, पॉलिसिस्टिक ओवरी सिंड्रोम (PCOS)"
                },
                advantages: {
                    english: "Weight neutral or weight loss, no hypoglycemia when used alone",
                    marathi: "वजन तटस्थ किंवा वजन कमी करणे, एकट्याने वापरताना हायपोग्लाइसेमिया नाही",
                    hindi: "वजन तटस्थ या वजन कम करना, अकेले उपयोग करने पर हाइपोग्लाइसीमिया नहीं"
                },
                disadvantages: {
                    english: "Gastrointestinal upset, lactic acidosis (rare), vitamin B12 deficiency",
                    marathi: "गॅस्ट्रोइंटेस्टाइनल अस्वस्थता, लैक्टिक अॅसिडोसिस (दुर्मिळ), व्हिटॅमिन B12 चीकमी",
                    hindi: "पेट की परेशानी, लैक्टिक एसिडोसिस (दुर्लभ), विटामिन B12 की कमी"
                },
                precautions: {
                    english: "Avoid in kidney disease, heart failure, liver disease",
                    marathi: "वृक्क रोग, हृदय अपयश, यकृत रोगामध्ये टाळावे",
                    hindi: "किडनी की बीमारी, दिल की कमजोरी, लिवर की बीमारी में बचें"
                },
                dosage: {
                    english: "Starting: 500mg twice daily with meals. Max: 2550mg/day",
                    marathi: "सुरुवात: जेवणासोबत दिवसातून दोनदा 500mg. जास्तीत जास्त: 2550mg/दिवस",
                    hindi: "शुरुआत: भोजन के साथ दिन में दो बार 500mg. अधिकतम: 2550mg/दिन"
                }
            },
            {
                id: 5,
                name: "Warfarin (Coumadin)",
                category: "Cardiovascular",
                uses: {
                    english: "Prevent blood clots, atrial fibrillation, deep vein thrombosis",
                    marathi: "रक्त गुठळी रोकणे, एट्रियल फायब्रिलेशन, डीप व्हेन थ्रॉम्बोसिस",
                    hindi: "खून के थक्के रोकना, एट्रियल फाइब्रिलेशन, डीप वेन थ्रॉम्बोसिस"
                },
                advantages: {
                    english: "Highly effective anticoagulant, reversible with vitamin K",
                    marathi: "अत्यंत प्रभावी रक्तस्राव-विरोधी, व्हिटॅमिन K ने बदलता येणारे",
                    hindi: "अत्यधिक प्रभावी एंटीकोआगुलेंट, विटामिन K से रिवर्स हो सकता है"
                },
                disadvantages: {
                    english: "Bleeding risk, frequent monitoring required, many drug interactions",
                    marathi: "रक्तस्रावाचा धोका, वारंवार तपासणी आवश्यक, अनेक औषध परस्परसंवाद",
                    hindi: "रक्तस्राव का जोखिम, बार-बार जांच आवश्यक, कई दवा इंटरेक्शन"
                },
                precautions: {
                    english: "Regular INR monitoring, avoid alcohol, consistent vitamin K intake",
                    marathi: "नियमित INR तपासणी, दारू टाळावी, सातत्यपूर्ण व्हिटॅमिन K सेवन",
                    hindi: "नियमित INR जांच, शराब से बचें, लगातार विटामिन K सेवन"
                },
                dosage: {
                    english: "Individual dosing based on INR, typically 2-10mg daily",
                    marathi: "INR वर आधारित वैयक्तिक डोस, सामान्यतः दिवसातून 2-10mg",
                    hindi: "INR के आधार पर व्यक्तिगत खुराक, आमतौर पर दिन में 2-10mg"
                }
            },
            {
                id: 6,
                name: "Aspirin (Bayer)",
                category: "Pain Relief",
                uses: {
                    english: "Pain relief, fever reduction, heart attack prevention, stroke prevention",
                    marathi: "वेदना कमी करणे, ताप कमी करणे, हृदयविकार प्रतिबंध, स्ट्रोक प्रतिबंध",
                    hindi: "दर्द निवारण, बुखार कम करना, हार्ट अटैक रोकथाम, स्ट्रोक रोकथाम"
                },
                advantages: {
                    english: "Cardioprotective, anti-inflammatory, inexpensive, widely available",
                    marathi: "हृदयरक्षक, दाहक-विरोधी, स्वस्त, सर्वत्र उपलब्ध",
                    hindi: "हृदय सुरक्षाकारी, सूजन-विरोधी, सस्ती, व्यापक रूप से उपलब्ध"
                },
                disadvantages: {
                    english: "Gastric irritation, bleeding risk, Reye's syndrome in children",
                    marathi: "गॅस्ट्रिक त्रास, रक्तस्रावाचा धोका, मुलांमध्ये रे सिंड्रोम",
                    hindi: "पेट में जलन, रक्तस्राव का जोखिम, बच्चों में रे सिंड्रोम"
                },
                precautions: {
                    english: "Avoid in children under 16, peptic ulcers, bleeding disorders",
                    marathi: "16 वर्षाखालील मुलांमध्ये टाळावे, पेप्टिक अल्सर, रक्तस्राव विकार",
                    hindi: "16 साल से कम बच्चों में बचें, पेप्टिक अल्सर, रक्तस्राव विकार"
                },
                dosage: {
                    english: "Pain: 325-650mg every 4 hours. Cardioprotection: 75-100mg daily",
                    marathi: "वेदना: दर 4 तासांनी 325-650mg. हृदयसंरक्षण: दिवसातून 75-100mg",
                    hindi: "दर्द: हर 4 घंटे में 325-650mg. हृदय सुरक्षा: दिन में 75-100mg"
                }
            }
        ];

        this.drugInteractions = [
            {
                id: 1,
                drug1: "Warfarin (Coumadin)",
                drug2: "Aspirin (Bayer)",
                interaction_type: "Harmful",
                severity: "High",
                description: {
                    english: "Increased bleeding risk due to combined anticoagulant effects",
                    marathi: "एकत्रित रक्तस्राव-विरोधी प्रभावांमुळे रक्तस्रावाचा धोका वाढतो",
                    hindi: "संयुक्त एंटीकोआगुलेंट प्रभावों के कारण रक्तस्राव का जोखिम बढ़ जाता है"
                },
                management: {
                    english: "Avoid combination or use with extreme caution. Monitor INR closely",
                    marathi: "संयोजन टाळावे किंवा अत्यंत सावधगिरीने वापरावे. INR चे जवळून निरीक्षण करावे",
                    hindi: "संयोजन से बचें या अत्यधिक सावधानी से उपयोग करें। INR की बारीकी से निगरानी करें"
                }
            },
            {
                id: 2,
                drug1: "Metformin (Glucophage)",
                drug2: "Acetaminophen (Tylenol)",
                interaction_type: "Safe",
                severity: "Low",
                description: {
                    english: "No significant interaction between these medications",
                    marathi: "या औषधांमध्ये कोणताही महत्त्वपूर्ण परस्परसंवाद नाही",
                    hindi: "इन दवाओं के बीच कोई महत्वपूर्ण इंटरेक्शन नहीं"
                },
                management: {
                    english: "Safe to use together as prescribed",
                    marathi: "सूचना अनुसार एकत्र वापरणे सुरक्षित",
                    hindi: "निर्देशानुसार एक साथ उपयोग करना सुरक्षित"
                }
            }
        ];

        this.foodInteractions = [
            {
                id: 1,
                drug: "Warfarin (Coumadin)",
                food: "Vitamin K rich foods",
                interaction_type: "Caution",
                severity: "Moderate",
                description: {
                    english: "Vitamin K can reduce warfarin effectiveness",
                    marathi: "व्हिटॅमिन K वार्फरिनची प्रभावीता कमी करू शकते",
                    hindi: "विटामिन K वारफारिन की प्रभावशीलता को कम कर सकता है"
                },
                management: {
                    english: "Maintain consistent vitamin K intake, monitor INR regularly",
                    marathi: "व्हिटॅमिन K चे सातत्यपूर्ण सेवन ठेवावे, INR नियमित तपासावे",
                    hindi: "विटामिन K का लगातार सेवन बनाए रखें, नियमित रूप से INR की जांच करें"
                }
            }
        ];

        this.emergencyContacts = [
            {
                category: "Emergency Services",
                contacts: [
                    { name: "Ambulance", number: "108", description: "Emergency medical services" },
                    { name: "Fire Brigade", number: "101", description: "Fire emergency services" }, 
                    { name: "Police", number: "100", description: "Police emergency services" }
                ]
            },
            {
                category: "Women's Helpline",
                contacts: [
                    { name: "Women Helpline", number: "1091", description: "Women in distress" },
                    { name: "Women's Safety", number: "181", description: "Women's safety helpline" }
                ]
            },
            {
                category: "Children's Helpline",
                contacts: [
                    { name: "Childline", number: "1098", description: "Child protection services" },
                    { name: "Missing Child", number: "1094", description: "Missing child helpline" }
                ]
            }
        ];

        this.healthTips = [
            {
                id: 1,
                category: "general",
                title: {
                    english: "Stay Hydrated",
                    marathi: "हायड्रेटेड राहा",
                    hindi: "हाइड्रेटेड रहें"
                },
                tip: {
                    english: "Drink at least 8 glasses of water daily to maintain proper hydration and support body functions.",
                    marathi: "योग्य हायड्रेशन राखण्यासाठी आणि शरीराच्या कार्यांना समर्थन देण्यासाठी दिवसातून कमीत कमी 8 ग्लास पाणी प्या.",
                    hindi: "उचित हाइड्रेशन बनाए रखने और शरीर के कार्यों का समर्थन करने के लिए दिन में कम से कम 8 गिलास पानी पिएं।"
                }
            },
            {
                id: 2,
                category: "exercise",
                title: {
                    english: "Regular Exercise",
                    marathi: "नियमित व्यायाम",
                    hindi: "नियमित व्यायाम"
                },
                tip: {
                    english: "Aim for at least 30 minutes of moderate exercise most days of the week to improve cardiovascular health.",
                    marathi: "हृदयाच्या आरोग्यात सुधारणा करण्यासाठी आठवड्याचे बहुतेक दिवस कमीत कमी 30 मिनिटे मध्यम व्यायाम करा.",
                    hindi: "हृदय स्वास्थ्य में सुधार के लिए सप्ताह के अधिकांश दिनों में कम से कम 30 मिनट का मध्यम व्यायाम करें।"
                }
            },
            {
                id: 3,
                category: "diet",
                title: {
                    english: "Balanced Diet",
                    marathi: "संतुलित आहार",
                    hindi: "संतुलित आहार"
                },
                tip: {
                    english: "Include a variety of fruits, vegetables, whole grains, and lean proteins in your daily meals.",
                    marathi: "आपल्या दैनंदिन जेवणात विविध फळे, भाज्या, संपूर्ण धान्य आणि दुबळे प्रथिने समाविष्ट करा.",
                    hindi: "अपने दैनिक भोजन में विभिन्न फल, सब्जियां, साबुत अनाज और दुबले प्रोटीन शामिल करें।"
                }
            }
        ];

        this.commonFoods = [
            "Alcohol", "Coffee", "Grapefruit", "Milk", "Vitamin K rich foods", 
            "Calcium rich foods", "Green tea", "Cranberry juice", "Dairy products",
            "High sodium foods", "Leafy green vegetables", "Citrus fruits"
        ];
    }

    setupEventListeners() {
        console.log('Setting up event listeners...');

        // Navigation with error handling
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach((item, index) => {
            try {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    const section = e.currentTarget.dataset.section;
                    console.log('Navigation clicked:', section);
                    this.navigateToSection(section);
                });
            } catch (error) {
                console.error(`Error setting up nav item ${index}:`, error);
            }
        });

        // Feature cards navigation
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                console.log('Feature card clicked:', section);
                this.navigateToSection(section);
            });
        });

        // Mobile navigation toggle
        const navToggle = document.getElementById('nav-toggle');
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                const navMenu = document.getElementById('nav-menu');
                if (navMenu) {
                    navMenu.classList.toggle('active');
                }
            });
        }

        // Language selector
        const languageSelect = document.getElementById('language-select');
        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => {
                this.currentLanguage = e.target.value;
                localStorage.setItem('medicare_language', this.currentLanguage);
                this.updateLanguage();
                this.renderCurrentSection();
            });
        }

        // Theme switcher
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                const themeOptions = document.querySelector('.theme-options');
                if (themeOptions) {
                    themeOptions.classList.toggle('hidden');
                }
            });
        }

        // Theme options
        const themeOptions = document.querySelectorAll('.theme-option');
        themeOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                const theme = e.currentTarget.dataset.theme;
                this.setTheme(theme);
                document.querySelector('.theme-options')?.classList.add('hidden');
            });
        });

        // Voice search
        const voiceBtn = document.getElementById('voice-btn');
        if (voiceBtn) {
            voiceBtn.addEventListener('click', () => {
                this.toggleVoiceSearch();
            });
        }

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.theme-switcher')) {
                const themeOptions = document.querySelector('.theme-options');
                if (themeOptions) {
                    themeOptions.classList.add('hidden');
                }
            }
        });

        // Modal functionality
        const modalClose = document.getElementById('modal-close');
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                this.closeModal();
            });
        }

        const medicineModal = document.getElementById('medicine-modal');
        if (medicineModal) {
            medicineModal.addEventListener('click', (e) => {
                if (e.target.id === 'medicine-modal') {
                    this.closeModal();
                }
            });
        }

        console.log('Event listeners set up complete');
    }

    setupSectionSpecificListeners() {
        // This will be called when switching to specific sections
        const currentSectionElement = document.getElementById(this.currentSection);
        if (!currentSectionElement) return;

        switch (this.currentSection) {
            case 'medicines':
                this.setupMedicinesListeners();
                break;
            case 'drug-drug':
                this.setupDrugInteractionListeners();
                break;
            case 'drug-food':
                this.setupFoodInteractionListeners();
                break;
            case 'reminders':
                this.setupRemindersListeners();
                break;
            case 'history':
                this.setupHistoryListeners();
                break;
            case 'scanner':
                this.setupScannerListeners();
                break;
            case 'health-tips':
                this.setupHealthTipsListeners();
                break;
            case 'ai-assistant':
                this.setupChatListeners();
                break;
        }
    }

    setupMedicinesListeners() {
        const medicineSearch = document.getElementById('medicine-search');
        if (medicineSearch) {
            medicineSearch.addEventListener('input', (e) => {
                this.filterMedicines(e.target.value);
            });
        }

        const medicineCategory = document.getElementById('medicine-category');
        if (medicineCategory) {
            medicineCategory.addEventListener('change', (e) => {
                this.filterMedicinesByCategory(e.target.value);
            });
        }
    }

    setupDrugInteractionListeners() {
        const checkBtn = document.getElementById('check-interaction');
        if (checkBtn) {
            checkBtn.addEventListener('click', () => {
                this.checkDrugInteraction();
            });
        }
    }

    setupFoodInteractionListeners() {
        const checkBtn = document.getElementById('check-food-interaction');
        if (checkBtn) {
            checkBtn.addEventListener('click', () => {
                this.checkFoodInteraction();
            });
        }
    }

    setupRemindersListeners() {
        const reminderForm = document.getElementById('reminder-form');
        if (reminderForm) {
            reminderForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addReminder();
            });
        }
    }

    setupHistoryListeners() {
        const historyForm = document.getElementById('history-form');
        if (historyForm) {
            historyForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addMedicalRecord();
            });
        }
    }

    setupScannerListeners() {
        const uploadBtn = document.getElementById('upload-btn');
        if (uploadBtn) {
            uploadBtn.addEventListener('click', () => {
                document.getElementById('file-input')?.click();
            });
        }

        const fileInput = document.getElementById('file-input');
        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                this.handleFileUpload(e.target.files[0]);
            });
        }

        const analyzeBtn = document.getElementById('analyze-btn');
        if (analyzeBtn) {
            analyzeBtn.addEventListener('click', () => {
                this.analyzePrescription();
            });
        }
    }

    setupHealthTipsListeners() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                this.filterHealthTips(category);
                filterBtns.forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
            });
        });
    }

    setupChatListeners() {
        const sendBtn = document.getElementById('send-btn');
        if (sendBtn) {
            sendBtn.addEventListener('click', () => {
                this.sendChatMessage();
            });
        }

        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendChatMessage();
                }
            });
        }

        const quickBtns = document.querySelectorAll('.quick-btn');
        quickBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const question = e.currentTarget.dataset.question;
                this.handleQuickQuestion(question);
            });
        });

        const voiceChatBtn = document.getElementById('voice-chat-btn');
        if (voiceChatBtn) {
            voiceChatBtn.addEventListener('click', () => {
                this.startVoiceChat();
            });
        }
    }

    setupVoiceRecognition() {
        if ('webkitSpeechRecognition' in window) {
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';

            this.recognition.onstart = () => {
                this.isVoiceActive = true;
                const voiceBtn = document.getElementById('voice-btn');
                const voiceFeedback = document.getElementById('voice-feedback');
                if (voiceBtn) voiceBtn.classList.add('active');
                if (voiceFeedback) voiceFeedback.classList.remove('hidden');
            };

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                this.processVoiceInput(transcript);
            };

            this.recognition.onend = () => {
                this.isVoiceActive = false;
                const voiceBtn = document.getElementById('voice-btn');
                const voiceFeedback = document.getElementById('voice-feedback');
                if (voiceBtn) voiceBtn.classList.remove('active');
                if (voiceFeedback) voiceFeedback.classList.add('hidden');
            };

            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.showToast('error', 'Voice Recognition Error', 'Failed to recognize speech. Please try again.');
            };
        }

        if ('speechSynthesis' in window) {
            this.synthesis = window.speechSynthesis;
        }
    }

    navigateToSection(sectionName) {
        console.log('Navigating to section:', sectionName);

        try {
            // Update navigation active state
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            
            const activeNavItem = document.querySelector(`[data-section="${sectionName}"]`);
            if (activeNavItem) {
                activeNavItem.classList.add('active');
            }

            // Close mobile menu
            const navMenu = document.getElementById('nav-menu');
            if (navMenu) {
                navMenu.classList.remove('active');
            }

            // Update current section
            this.currentSection = sectionName;

            // Hide all sections
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });

            // Show target section
            const targetSection = document.getElementById(sectionName);
            if (targetSection) {
                targetSection.classList.add('active');
            } else {
                console.error('Section not found:', sectionName);
                return;
            }

            // Render section content and setup listeners
            this.renderCurrentSection();
            this.setupSectionSpecificListeners();

            console.log('Navigation completed to:', sectionName);
        } catch (error) {
            console.error('Navigation error:', error);
        }
    }

    renderCurrentSection() {
        console.log('Rendering section:', this.currentSection);

        try {
            switch (this.currentSection) {
                case 'medicines':
                    this.renderMedicines();
                    break;
                case 'drug-drug':
                    this.renderDrugInteractionChecker();
                    break;
                case 'drug-food':
                    this.renderFoodInteractionChecker();
                    break;
                case 'reminders':
                    this.renderReminders();
                    break;
                case 'history':
                    this.renderMedicalHistory();
                    break;
                case 'emergency':
                    this.renderEmergencyContacts();
                    break;
                case 'health-tips':
                    this.renderHealthTips();
                    break;
                case 'ai-assistant':
                    this.renderAIAssistant();
                    break;
                case 'scanner':
                    // Scanner is already rendered in HTML
                    break;
                case 'home':
                default:
                    // Home is already rendered in HTML
                    break;
            }
        } catch (error) {
            console.error('Error rendering section:', error);
        }
    }

    renderMedicines() {
        const grid = document.getElementById('medicines-grid');
        if (!grid) {
            console.error('Medicines grid not found');
            return;
        }

        try {
            grid.innerHTML = this.medicines.map(medicine => `
                <div class="medicine-card" onclick="app.showMedicineDetail(${medicine.id})">
                    <div class="category-badge">${medicine.category}</div>
                    <h3>${medicine.name}</h3>
                    <div class="uses">
                        <strong>Uses:</strong> ${medicine.uses[this.currentLanguage]}
                    </div>
                    <div class="actions">
                        <button class="btn btn--sm btn--primary" onclick="event.stopPropagation(); app.showMedicineDetail(${medicine.id})">
                            <i class="fas fa-info-circle"></i> Details
                        </button>
                        <button class="btn btn--sm btn--secondary" onclick="event.stopPropagation(); app.speak('${medicine.uses[this.currentLanguage].replace(/'/g, "\\'")}')">
                            <i class="fas fa-volume-up"></i> Listen
                        </button>
                    </div>
                </div>
            `).join('');
            
            console.log('Medicines rendered:', this.medicines.length);
        } catch (error) {
            console.error('Error rendering medicines:', error);
        }
    }

    renderDrugInteractionChecker() {
        const drug1Select = document.getElementById('drug1-select');
        const drug2Select = document.getElementById('drug2-select');
        
        if (!drug1Select || !drug2Select) {
            console.error('Drug selectors not found');
            return;
        }

        try {
            const options = this.medicines.map(med => 
                `<option value="${med.name}">${med.name}</option>`
            ).join('');
            
            drug1Select.innerHTML = '<option value="">Choose a drug...</option>' + options;
            drug2Select.innerHTML = '<option value="">Choose a drug...</option>' + options;
            
            console.log('Drug interaction checker rendered');
        } catch (error) {
            console.error('Error rendering drug interaction checker:', error);
        }
    }

    renderFoodInteractionChecker() {
        const drugSelect = document.getElementById('drug-food-select');
        const foodSelect = document.getElementById('food-select');
        
        if (!drugSelect || !foodSelect) {
            console.error('Food interaction selectors not found');
            return;
        }

        try {
            drugSelect.innerHTML = '<option value="">Choose a drug...</option>' + 
                this.medicines.map(med => `<option value="${med.name}">${med.name}</option>`).join('');
            
            foodSelect.innerHTML = '<option value="">Choose a food...</option>' + 
                this.commonFoods.map(food => `<option value="${food}">${food}</option>`).join('');
                
            console.log('Food interaction checker rendered');
        } catch (error) {
            console.error('Error rendering food interaction checker:', error);
        }
    }

    renderReminders() {
        const list = document.getElementById('reminders-list');
        if (!list) return;

        if (this.reminders.length === 0) {
            list.innerHTML = '<div class="card"><div class="card__body"><p>No reminders set yet.</p></div></div>';
            return;
        }

        list.innerHTML = this.reminders.map((reminder, index) => `
            <div class="reminder-card">
                <div class="reminder-time">${reminder.time}</div>
                <div class="reminder-medicine">${reminder.medicine}</div>
                <div class="reminder-dosage">${reminder.dosage}</div>
                <div class="reminder-frequency">${reminder.frequency}</div>
                <div class="reminder-actions">
                    <button class="btn btn--sm btn--secondary" onclick="app.editReminder(${index})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn--sm btn--outline" onclick="app.deleteReminder(${index})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `).join('');
    }

    renderMedicalHistory() {
        const list = document.getElementById('history-list');
        if (!list) return;

        if (this.medicalHistory.length === 0) {
            list.innerHTML = '<div class="card"><div class="card__body"><p>No medical records added yet.</p></div></div>';
            return;
        }

        list.innerHTML = this.medicalHistory.map((record, index) => `
            <div class="history-card">
                <div class="history-date">${record.date}</div>
                <div class="history-condition">${record.condition}</div>
                <div class="history-details">
                    <div class="history-detail">
                        <h4>Prescription:</h4>
                        <p>${record.prescription || 'None'}</p>
                    </div>
                    <div class="history-detail">
                        <h4>Allergies:</h4>
                        <p>${record.allergies || 'None'}</p>
                    </div>
                    <div class="history-detail">
                        <h4>Notes:</h4>
                        <p>${record.notes || 'None'}</p>
                    </div>
                </div>
                <div class="history-actions">
                    <button class="btn btn--sm btn--secondary" onclick="app.editMedicalRecord(${index})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn--sm btn--outline" onclick="app.deleteMedicalRecord(${index})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `).join('');
    }

    renderEmergencyContacts() {
        const grid = document.getElementById('emergency-grid');
        if (!grid) return;

        grid.innerHTML = this.emergencyContacts.map(category => `
            <div class="emergency-category">
                <h3>${category.category}</h3>
                <div class="emergency-contacts">
                    ${category.contacts.map(contact => `
                        <a href="tel:${contact.number}" class="emergency-contact">
                            <div class="contact-icon">
                                <i class="fas fa-phone"></i>
                            </div>
                            <div class="contact-info">
                                <h4>${contact.name}</h4>
                                <div class="contact-number">${contact.number}</div>
                                <p>${contact.description}</p>
                            </div>
                        </a>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    renderHealthTips() {
        const grid = document.getElementById('health-tips-grid');
        if (!grid) return;

        const filteredTips = this.currentTipCategory === 'all' || !this.currentTipCategory 
            ? this.healthTips 
            : this.healthTips.filter(tip => tip.category === this.currentTipCategory);

        grid.innerHTML = filteredTips.map(tip => `
            <div class="tip-card">
                <div class="tip-category">${tip.category}</div>
                <h3>${tip.title[this.currentLanguage]}</h3>
                <p>${tip.tip[this.currentLanguage]}</p>
                <div class="tip-actions">
                    <button class="btn btn--sm btn--secondary" onclick="app.speak('${tip.tip[this.currentLanguage].replace(/'/g, "\\'")}')">
                        <i class="fas fa-volume-up"></i> Listen
                    </button>
                    <button class="btn btn--sm btn--outline" onclick="app.shareTip(${tip.id})">
                        <i class="fas fa-share"></i> Share
                    </button>
                </div>
            </div>
        `).join('');
    }

    renderAIAssistant() {
        const chatMessages = document.getElementById('chat-messages');
        if (chatMessages && chatMessages.children.length <= 1) {
            this.addChatMessage('bot', this.translations[this.currentLanguage].ai_greeting || 
                "Hello! I'm your MediCare+ AI Assistant. How can I help you with your health questions today?");
        }
    }

    // Interaction checking methods
    checkDrugInteraction() {
        const drug1Select = document.getElementById('drug1-select');
        const drug2Select = document.getElementById('drug2-select');
        const resultDiv = document.getElementById('interaction-result');

        if (!drug1Select || !drug2Select || !resultDiv) {
            console.error('Drug interaction elements not found');
            return;
        }

        const drug1 = drug1Select.value;
        const drug2 = drug2Select.value;

        if (!drug1 || !drug2) {
            this.showToast('error', 'Selection Required', 'Please select both drugs to check interaction.');
            return;
        }

        if (drug1 === drug2) {
            this.showToast('error', 'Same Drug Selected', 'Please select two different drugs.');
            return;
        }

        // Find interaction
        const interaction = this.drugInteractions.find(inter => 
            (inter.drug1 === drug1 && inter.drug2 === drug2) ||
            (inter.drug1 === drug2 && inter.drug2 === drug1)
        );

        resultDiv.classList.remove('hidden');

        if (interaction) {
            const severityClass = interaction.interaction_type.toLowerCase() === 'harmful' ? 'severity-harmful' :
                                 interaction.interaction_type.toLowerCase() === 'caution' ? 'severity-caution' : 'severity-safe';
            
            const icon = interaction.interaction_type.toLowerCase() === 'harmful' ? '❌' :
                        interaction.interaction_type.toLowerCase() === 'caution' ? '⚠️' : '✅';

            resultDiv.innerHTML = `
                <h3>Interaction Found</h3>
                <div class="severity-indicator ${severityClass}">
                    ${icon} ${interaction.interaction_type} - ${interaction.severity} Risk
                </div>
                <div class="interaction-details">
                    <h4>Description:</h4>
                    <p>${interaction.description[this.currentLanguage] || interaction.description.english}</p>
                    <h4>Management:</h4>
                    <p>${interaction.management[this.currentLanguage] || interaction.management.english}</p>
                </div>
            `;
        } else {
            resultDiv.innerHTML = `
                <h3>No Known Interaction</h3>
                <div class="severity-indicator severity-safe">
                    ✅ Safe - No known interactions
                </div>
                <p>No harmful interactions found between ${drug1} and ${drug2}. However, always consult with your healthcare provider.</p>
            `;
        }
    }

    checkFoodInteraction() {
        const drugSelect = document.getElementById('drug-food-select');
        const foodSelect = document.getElementById('food-select');
        const resultDiv = document.getElementById('food-interaction-result');

        if (!drugSelect || !foodSelect || !resultDiv) {
            console.error('Food interaction elements not found');
            return;
        }

        const drug = drugSelect.value;
        const food = foodSelect.value;

        if (!drug || !food) {
            this.showToast('error', 'Selection Required', 'Please select both drug and food to check interaction.');
            return;
        }

        // Find interaction
        const interaction = this.foodInteractions.find(inter => 
            inter.drug === drug && inter.food === food
        );

        resultDiv.classList.remove('hidden');

        if (interaction) {
            const severityClass = interaction.interaction_type.toLowerCase() === 'harmful' ? 'severity-harmful' :
                                 interaction.interaction_type.toLowerCase() === 'caution' ? 'severity-caution' : 'severity-safe';
            
            const icon = interaction.interaction_type.toLowerCase() === 'harmful' ? '❌' :
                        interaction.interaction_type.toLowerCase() === 'caution' ? '⚠️' : '✅';

            resultDiv.innerHTML = `
                <h3>Food Interaction Found</h3>
                <div class="severity-indicator ${severityClass}">
                    ${icon} ${interaction.interaction_type} - ${interaction.severity} Risk
                </div>
                <div class="interaction-details">
                    <h4>Description:</h4>
                    <p>${interaction.description[this.currentLanguage] || interaction.description.english}</p>
                    <h4>Management:</h4>
                    <p>${interaction.management[this.currentLanguage] || interaction.management.english}</p>
                </div>
            `;
        } else {
            resultDiv.innerHTML = `
                <h3>No Known Food Interaction</h3>
                <div class="severity-indicator severity-safe">
                    ✅ Safe - No known food interactions
                </div>
                <p>No harmful food interactions found between ${drug} and ${food}. However, always follow medication instructions.</p>
            `;
        }
    }

    // Utility methods
    filterMedicines(searchTerm) {
        const grid = document.getElementById('medicines-grid');
        if (!grid) return;

        const filtered = this.medicines.filter(medicine => 
            medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            medicine.uses[this.currentLanguage].toLowerCase().includes(searchTerm.toLowerCase())
        );

        grid.innerHTML = filtered.map(medicine => `
            <div class="medicine-card" onclick="app.showMedicineDetail(${medicine.id})">
                <div class="category-badge">${medicine.category}</div>
                <h3>${medicine.name}</h3>
                <div class="uses">
                    <strong>Uses:</strong> ${medicine.uses[this.currentLanguage]}
                </div>
                <div class="actions">
                    <button class="btn btn--sm btn--primary" onclick="event.stopPropagation(); app.showMedicineDetail(${medicine.id})">
                        <i class="fas fa-info-circle"></i> Details
                    </button>
                    <button class="btn btn--sm btn--secondary" onclick="event.stopPropagation(); app.speak('${medicine.uses[this.currentLanguage].replace(/'/g, "\\'")}')">
                        <i class="fas fa-volume-up"></i> Listen
                    </button>
                </div>
            </div>
        `).join('');
    }

    filterMedicinesByCategory(category) {
        const filtered = category ? 
            this.medicines.filter(medicine => medicine.category === category) : 
            this.medicines;

        const grid = document.getElementById('medicines-grid');
        if (!grid) return;

        grid.innerHTML = filtered.map(medicine => `
            <div class="medicine-card" onclick="app.showMedicineDetail(${medicine.id})">
                <div class="category-badge">${medicine.category}</div>
                <h3>${medicine.name}</h3>
                <div class="uses">
                    <strong>Uses:</strong> ${medicine.uses[this.currentLanguage]}
                </div>
                <div class="actions">
                    <button class="btn btn--sm btn--primary" onclick="event.stopPropagation(); app.showMedicineDetail(${medicine.id})">
                        <i class="fas fa-info-circle"></i> Details
                    </button>
                    <button class="btn btn--sm btn--secondary" onclick="event.stopPropagation(); app.speak('${medicine.uses[this.currentLanguage].replace(/'/g, "\\'")}')">
                        <i class="fas fa-volume-up"></i> Listen
                    </button>
                </div>
            </div>
        `).join('');
    }

    showMedicineDetail(medicineId) {
        const medicine = this.medicines.find(med => med.id === medicineId);
        if (!medicine) return;

        const modal = document.getElementById('medicine-modal');
        const nameElement = document.getElementById('modal-medicine-name');
        const bodyElement = document.getElementById('modal-body');

        if (!modal || !nameElement || !bodyElement) return;

        nameElement.textContent = medicine.name;
        bodyElement.innerHTML = `
            <div class="medicine-details">
                <div class="detail-section">
                    <h4>Uses</h4>
                    <p>${medicine.uses[this.currentLanguage]}</p>
                </div>
                <div class="detail-section">
                    <h4>Advantages</h4>
                    <p>${medicine.advantages[this.currentLanguage]}</p>
                </div>
                <div class="detail-section">
                    <h4>Disadvantages / Side Effects</h4>
                    <p>${medicine.disadvantages[this.currentLanguage]}</p>
                </div>
                <div class="detail-section">
                    <h4>Precautions</h4>
                    <p>${medicine.precautions[this.currentLanguage]}</p>
                </div>
                <div class="detail-section">
                    <h4>Dosage</h4>
                    <p>${medicine.dosage[this.currentLanguage]}</p>
                </div>
                <div class="detail-section">
                    <h4>Category</h4>
                    <p>${medicine.category}</p>
                </div>
            </div>
        `;

        modal.classList.remove('hidden');
    }

    closeModal() {
        const modal = document.getElementById('medicine-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    // Form handling methods
    addReminder() {
        const medicine = document.getElementById('reminder-medicine')?.value;
        const dosage = document.getElementById('reminder-dosage')?.value;
        const time = document.getElementById('reminder-time')?.value;
        const frequency = document.getElementById('reminder-frequency')?.value;

        if (!medicine || !dosage || !time) {
            this.showToast('error', 'Missing Information', 'Please fill in all required fields.');
            return;
        }

        const reminder = {
            id: Date.now(),
            medicine,
            dosage,
            time,
            frequency,
            created: new Date().toISOString()
        };

        this.reminders.push(reminder);
        this.saveReminders();
        this.renderReminders();
        
        // Clear form
        const form = document.getElementById('reminder-form');
        if (form) form.reset();
        
        this.showToast('success', 'Reminder Added', `Reminder set for ${medicine} at ${time}`);
        this.scheduleNotification(reminder);
    }

    addMedicalRecord() {
        const date = document.getElementById('history-date')?.value;
        const condition = document.getElementById('history-condition')?.value;
        const prescription = document.getElementById('history-prescription')?.value;
        const allergies = document.getElementById('history-allergies')?.value;
        const notes = document.getElementById('history-notes')?.value;

        if (!date || !condition) {
            this.showToast('error', 'Missing Information', 'Please fill in date and condition.');
            return;
        }

        const record = {
            id: Date.now(),
            date,
            condition,
            prescription,
            allergies,
            notes,
            created: new Date().toISOString()
        };

        this.medicalHistory.push(record);
        this.saveMedicalHistory();
        this.renderMedicalHistory();
        
        // Clear form
        const form = document.getElementById('history-form');
        if (form) form.reset();
        
        this.showToast('success', 'Record Saved', 'Medical record has been saved successfully.');
    }

    // Voice and AI methods
    toggleVoiceSearch() {
        if (!this.recognition) {
            this.showToast('error', 'Not Supported', 'Voice recognition is not supported in this browser.');
            return;
        }

        if (this.isVoiceActive) {
            this.recognition.stop();
        } else {
            this.recognition.start();
        }
    }

    processVoiceInput(transcript) {
        console.log('Voice input:', transcript);
        
        if (transcript.toLowerCase().includes('search') || transcript.toLowerCase().includes('find')) {
            const searchTerm = transcript.replace(/search|find|for|medicine/gi, '').trim();
            if (searchTerm) {
                this.navigateToSection('medicines');
                setTimeout(() => {
                    const searchInput = document.getElementById('medicine-search');
                    if (searchInput) {
                        searchInput.value = searchTerm;
                        this.filterMedicines(searchTerm);
                    }
                }, 500);
                this.speak(`Searching for ${searchTerm}`);
            }
        } else {
            this.navigateToSection('medicines');
            setTimeout(() => {
                const searchInput = document.getElementById('medicine-search');
                if (searchInput) {
                    searchInput.value = transcript;
                    this.filterMedicines(transcript);
                }
            }, 500);
            this.speak(`Looking up ${transcript}`);
        }
    }

    speak(text) {
        if (this.synthesis && text) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.8;
            utterance.pitch = 1;
            utterance.volume = 0.8;
            this.synthesis.speak(utterance);
        }
    }

    // Chat methods
    sendChatMessage() {
        const input = document.getElementById('chat-input');
        if (!input) return;
        
        const message = input.value.trim();
        if (!message) return;

        this.addChatMessage('user', message);
        input.value = '';

        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) typingIndicator.classList.remove('hidden');

        setTimeout(() => {
            if (typingIndicator) typingIndicator.classList.add('hidden');
            const response = this.generateAIResponse(message);
            this.addChatMessage('bot', response);
            
            if (this.synthesis) {
                this.speak(response);
            }
        }, 1500);
    }

    addChatMessage(sender, message) {
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-${sender === 'bot' ? 'robot' : 'user'}"></i>
            </div>
            <div class="message-content">
                <p>${message}</p>
                <span class="message-time">${time}</span>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    generateAIResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        if (message.includes('tell me about') || message.includes('what is')) {
            const medicineName = this.extractMedicineName(message);
            if (medicineName) {
                const medicine = this.medicines.find(med => 
                    med.name.toLowerCase().includes(medicineName.toLowerCase())
                );
                if (medicine) {
                    return `${medicine.name} is used for: ${medicine.uses[this.currentLanguage]}. 
                           Dosage: ${medicine.dosage[this.currentLanguage]}. 
                           Would you like to know about its side effects or precautions?`;
                }
            }
            return "I'd be happy to help! Could you specify which medicine you'd like to know about?";
        }
        
        if (message.includes('side effect')) {
            return "Side effects can vary by medication. Could you specify which medicine you're asking about? I can provide detailed information about its disadvantages and precautions.";
        }
        
        if (message.includes('interaction')) {
            return "Drug interactions are important to check! You can use our Drug-Drug Interaction or Drug-Food Interaction checkers to see if your medications interact with each other or with foods.";
        }
        
        if (message.includes('dosage') || message.includes('dose')) {
            return "Dosage information depends on the specific medication, your age, weight, and medical condition. Could you tell me which medication you're asking about?";
        }
        
        if (message.includes('reminder')) {
            return "I can help you set up medication reminders! Go to the Reminders section where you can add your medications, dosages, and preferred times.";
        }

        if (message.includes('emergency') || message.includes('urgent')) {
            return "For medical emergencies, please contact emergency services immediately (dial 108 for ambulance in India). You can also check our Emergency Contacts section for quick access to important phone numbers.";
        }
        
        const responses = [
            "I'm here to help with your medication questions! You can ask me about drug information, interactions, dosages, or use our various tools.",
            "Feel free to ask me about any medications, their uses, side effects, or interactions. I can also guide you to the right section of MediCare+.",
            "How can I assist you today? I can help with drug information, interactions, health tips, or guide you through our features."
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    extractMedicineName(message) {
        const words = message.split(' ');
        const commonWords = ['tell', 'me', 'about', 'what', 'is', 'the', 'medicine', 'drug', 'medication'];
        const medicineName = words.find(word => 
            word.length > 3 && 
            !commonWords.includes(word.toLowerCase()) &&
            this.medicines.some(med => med.name.toLowerCase().includes(word.toLowerCase()))
        );
        return medicineName;
    }

    handleQuickQuestion(questionType) {
        const questions = {
            drug_info: "Can you tell me about a specific medicine?",
            side_effects: "What are the side effects of a medication?",
            interactions: "How do I check for drug interactions?",
            dosage: "What's the right dosage for a medication?"
        };

        const question = questions[questionType];
        if (question) {
            const chatInput = document.getElementById('chat-input');
            if (chatInput) {
                chatInput.value = question;
                this.sendChatMessage();
            }
        }
    }

    startVoiceChat() {
        if (!this.recognition) {
            this.showToast('error', 'Not Supported', 'Voice recognition is not supported in this browser.');
            return;
        }

        this.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            const chatInput = document.getElementById('chat-input');
            if (chatInput) {
                chatInput.value = transcript;
                this.sendChatMessage();
            }
        };

        this.recognition.start();
    }

    // File upload methods
    handleFileUpload(file) {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const preview = document.getElementById('image-preview');
            const image = document.getElementById('preview-image');
            const uploadArea = document.getElementById('upload-area');
            
            if (!preview || !image || !uploadArea) return;

            image.src = e.target.result;
            preview.classList.remove('hidden');
            uploadArea.style.display = 'none';
        };
        
        if (file.type.startsWith('image/')) {
            reader.readAsDataURL(file);
        } else if (file.type === 'application/pdf') {
            const preview = document.getElementById('image-preview');
            const image = document.getElementById('preview-image');
            const uploadArea = document.getElementById('upload-area');
            
            if (preview && image && uploadArea) {
                image.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400"><rect width="300" height="400" fill="%23f0f0f0"/><text x="150" y="200" text-anchor="middle" fill="%23666">PDF File Selected</text></svg>';
                preview.classList.remove('hidden');
                uploadArea.style.display = 'none';
            }
        }
    }

    analyzePrescription() {
        this.showLoading();
        
        setTimeout(() => {
            const simulatedExtraction = [
                'Amlodipine 5mg',
                'Lisinopril 10mg',
                'Metformin 500mg',
                'Unknown Medicine XYZ'
            ];

            const resultsDiv = document.getElementById('scan-results');
            if (resultsDiv) {
                resultsDiv.classList.remove('hidden');
                resultsDiv.innerHTML = `
                    <h3>Extracted Medicines</h3>
                    <div class="extracted-medicines">
                        ${simulatedExtraction.map(medicine => {
                            const found = this.medicines.find(med => 
                                med.name.toLowerCase().includes(medicine.toLowerCase().split(' ')[0])
                            );
                            
                            if (found) {
                                return `
                                    <div class="extracted-medicine found">
                                        <h4>✅ ${medicine}</h4>
                                        <p><strong>Match found:</strong> ${found.name}</p>
                                        <p><strong>Uses:</strong> ${found.uses[this.currentLanguage]}</p>
                                        <button class="btn btn--sm btn--primary" onclick="app.showMedicineDetail(${found.id})">
                                            View Details
                                        </button>
                                    </div>
                                `;
                            } else {
                                return `
                                    <div class="extracted-medicine not-found">
                                        <h4>❌ ${medicine}</h4>
                                        <p>Medicine not found in database</p>
                                        <p>Please consult with your healthcare provider for more information.</p>
                                    </div>
                                `;
                            }
                        }).join('')}
                    </div>
                `;
            }
            
            this.hideLoading();
            this.showToast('success', 'Analysis Complete', 'Prescription has been analyzed successfully.');
        }, 2000);
    }

    // Health tips methods
    filterHealthTips(category) {
        this.currentTipCategory = category;
        this.renderHealthTips();
    }

    shareTip(tipId) {
        const tip = this.healthTips.find(t => t.id === tipId);
        if (!tip) return;

        if (navigator.share) {
            navigator.share({
                title: tip.title[this.currentLanguage],
                text: tip.tip[this.currentLanguage],
                url: window.location.href
            });
        } else {
            const text = `${tip.title[this.currentLanguage]}: ${tip.tip[this.currentLanguage]}`;
            navigator.clipboard.writeText(text).then(() => {
                this.showToast('success', 'Copied', 'Health tip copied to clipboard!');
            });
        }
    }

    // Reminder management
    deleteReminder(index) {
        if (confirm('Are you sure you want to delete this reminder?')) {
            this.reminders.splice(index, 1);
            this.saveReminders();
            this.renderReminders();
            this.showToast('success', 'Reminder Deleted', 'Reminder has been deleted successfully.');
        }
    }

    editReminder(index) {
        const reminder = this.reminders[index];
        const medicineInput = document.getElementById('reminder-medicine');
        const dosageInput = document.getElementById('reminder-dosage');
        const timeInput = document.getElementById('reminder-time');
        const frequencyInput = document.getElementById('reminder-frequency');

        if (medicineInput) medicineInput.value = reminder.medicine;
        if (dosageInput) dosageInput.value = reminder.dosage;
        if (timeInput) timeInput.value = reminder.time;
        if (frequencyInput) frequencyInput.value = reminder.frequency;
        
        this.deleteReminder(index);
    }

    deleteMedicalRecord(index) {
        if (confirm('Are you sure you want to delete this medical record?')) {
            this.medicalHistory.splice(index, 1);
            this.saveMedicalHistory();
            this.renderMedicalHistory();
            this.showToast('success', 'Record Deleted', 'Medical record has been deleted successfully.');
        }
    }

    editMedicalRecord(index) {
        const record = this.medicalHistory[index];
        const dateInput = document.getElementById('history-date');
        const conditionInput = document.getElementById('history-condition');
        const prescriptionInput = document.getElementById('history-prescription');
        const allergiesInput = document.getElementById('history-allergies');
        const notesInput = document.getElementById('history-notes');

        if (dateInput) dateInput.value = record.date;
        if (conditionInput) conditionInput.value = record.condition;
        if (prescriptionInput) prescriptionInput.value = record.prescription;
        if (allergiesInput) allergiesInput.value = record.allergies;
        if (notesInput) notesInput.value = record.notes;
        
        this.deleteMedicalRecord(index);
    }

    scheduleNotification(reminder) {
        if ('Notification' in window) {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    const now = new Date();
                    const reminderTime = new Date();
                    const [hours, minutes] = reminder.time.split(':');
                    reminderTime.setHours(hours, minutes, 0, 0);
                    
                    if (reminderTime < now) {
                        reminderTime.setDate(reminderTime.getDate() + 1);
                    }
                    
                    const timeUntilReminder = reminderTime.getTime() - now.getTime();
                    
                    setTimeout(() => {
                        new Notification('MediCare+ Reminder', {
                            body: `Time to take ${reminder.medicine} - ${reminder.dosage}`,
                            icon: '/favicon.ico',
                            badge: '/favicon.ico'
                        });
                    }, timeUntilReminder);
                }
            });
        }
    }

    // Theme and language methods
    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-color-scheme', theme);
        localStorage.setItem('medicare_theme', theme);
    }

    updateLanguage() {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (this.translations[this.currentLanguage] && this.translations[this.currentLanguage][key]) {
                element.textContent = this.translations[this.currentLanguage][key];
            }
        });

        document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            if (this.translations[this.currentLanguage] && this.translations[this.currentLanguage][key]) {
                element.placeholder = this.translations[this.currentLanguage][key];
            }
        });
    }

    // Data persistence methods
    loadSavedData() {
        const savedTheme = localStorage.getItem('medicare_theme');
        if (savedTheme) {
            this.setTheme(savedTheme);
        }

        const savedLanguage = localStorage.getItem('medicare_language');
        if (savedLanguage) {
            this.currentLanguage = savedLanguage;
            const languageSelect = document.getElementById('language-select');
            if (languageSelect) {
                languageSelect.value = savedLanguage;
            }
        }

        const savedReminders = localStorage.getItem('medicare_reminders');
        if (savedReminders) {
            try {
                this.reminders = JSON.parse(savedReminders);
            } catch (e) {
                console.error('Error loading reminders:', e);
            }
        }

        const savedHistory = localStorage.getItem('medicare_history');
        if (savedHistory) {
            try {
                this.medicalHistory = JSON.parse(savedHistory);
            } catch (e) {
                console.error('Error loading medical history:', e);
            }
        }
    }

    saveReminders() {
        localStorage.setItem('medicare_reminders', JSON.stringify(this.reminders));
    }

    saveMedicalHistory() {
        localStorage.setItem('medicare_history', JSON.stringify(this.medicalHistory));
    }

    // UI utility methods
    showLoading() {
        const spinner = document.getElementById('loading-spinner');
        if (spinner) {
            spinner.classList.remove('hidden');
        }
    }

    hideLoading() {
        const spinner = document.getElementById('loading-spinner');
        if (spinner) {
            spinner.classList.add('hidden');
        }
    }

    showToast(type, title, message) {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = type === 'success' ? 'fa-check-circle' : 
                    type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
        
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas ${icon}"></i>
            </div>
            <div class="toast-content">
                <h4>${title}</h4>
                <p>${message}</p>
            </div>
            <button class="toast-close">
                <i class="fas fa-times"></i>
            </button>
        `;

        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.remove();
        });

        container.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 100);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }
}

// Initialize the application
const app = new MediCarePlus();