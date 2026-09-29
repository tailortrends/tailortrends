import { Industry, Article, Author, StoryIdea, NewsInboxItem, ResearchProject } from '../types/index.ts';

export const SEED_AUTHORS: Author[] = [
  {
    id: 'author-shyam',
    name: 'Shyam Tailor',
    role: 'Founder & Editor-in-Chief',
    bio: 'Investigates the intersection of artificial intelligence, industrial workflows, and the frontline trades. Believes technology is only as good as its real-world application.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    email: 'shyam@tailortrends.com'
  },
  {
    id: 'author-marcus',
    name: 'Marcus Vance',
    role: 'Industrial Automation & Trades Editor',
    bio: 'Former mechanical contractor and controls engineer covering robotics, field diagnostics, and manufacturing technology.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    email: 'marcus.vance@tailortrends.com'
  },
  {
    id: 'author-elena',
    name: 'Elena Rostova',
    role: 'Emerging Tech & Enterprise Analyst',
    bio: 'Tracks multimodal foundation models, spatial computing, and how enterprise software actually filters down into mid-market businesses.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    email: 'elena.rostova@tailortrends.com'
  }
];

export const SEED_INDUSTRIES: Industry[] = [
  {
    id: 'hvac',
    name: 'HVAC',
    slug: 'hvac',
    shortDescription: 'Heating, ventilation, air conditioning, refrigeration, and smart building management.',
    heroSubtitle: 'How artificial intelligence, acoustic diagnostics, thermal vision, and connected equipment are revolutionizing service calls and energy efficiency.',
    iconName: 'Fan',
    badgeColor: 'sky',
    practicalApplications: [
      'Acoustic vibration analysis to diagnose compressor failure before breakdown',
      'Computer vision reading corroded serial plates and wiring schematics',
      'Refrigerant superheat and subcooling verification via field copilot',
      'Automated airflow and duct sizing calculations from iPhone LiDAR scans',
      'Dynamic fault detection and diagnostics (FDD) in commercial BACnet systems'
    ],
    toolsCurrentlyAvailable: [
      { name: 'MeasureQuick + AI Assistant', purpose: 'Guided HVAC electrical and refrigerant diagnostics' },
      { name: 'Fluke 393 FC + Cloud ML', purpose: 'Solar and commercial inverter power telemetry' },
      { name: 'Copilot Field Mobile', purpose: 'Instant PDF manual schematic interpretation' }
    ],
    jobsAffected: ['Field Service Technician', 'HVAC Estimator', 'Controls Engineer', 'Dispatch Coordinator'],
    skillsWorkersShouldLearn: ['Diagnostic prompt engineering', 'Digital multimeter cloud sync', 'BACnet / IP basics', 'Heat pump thermal imaging interpretation'],
    futureOutlook: 'By 2028, over 65% of commercial HVAC calls will begin with remote telemetry triage before a van rolls, saving hours of diagnosis and reducing warranty recalls.',
    relatedTechnologies: ['Computer Vision', 'Acoustic Sensors', 'LiDAR', 'Edge AI', 'IoT Telemetry']
  },
  {
    id: 'construction-trades',
    name: 'Construction & Skilled Trades',
    slug: 'construction-trades',
    shortDescription: 'Commercial and residential building, plumbing, electrical, framing, and site safety.',
    heroSubtitle: 'From automated submittal review and 3D progress tracking to robotic layout and predictive OSHA safety monitoring.',
    iconName: 'Hammer',
    badgeColor: 'amber',
    practicalApplications: [
      'Computer vision scanning 360-degree jobsite footage against BIM models to catch errors early',
      'Automated spec book and architectural submittal indexing',
      'Computer vision hazard detection for PPE compliance and trench safety',
      'Robotic total station layout marking drywall tracks and stub-ups directly on slabs'
    ],
    toolsCurrentlyAvailable: [
      { name: 'OpenSpace.ai', purpose: 'Automated 360 video site documentation mapped to floor plans' },
      { name: 'Dusty Robotics FieldPrinter', purpose: 'Autonomous BIM layout printer on concrete decks' },
      { name: 'Togal.ai', purpose: 'Automated architectural takeoff and square-footage estimation' }
    ],
    jobsAffected: ['Project Manager', 'Estimator', 'Site Superintendent', 'Safety Director', 'Electrician'],
    skillsWorkersShouldLearn: ['BIM coordinate reading', 'Drone inspection pilot license', 'AI takeoff verification', 'Tablets on site management'],
    futureOutlook: 'Construction rework averages 5% of total project costs. AI-assisted daily site scanning will reduce preventable rework by up to 40% over the next four years.',
    relatedTechnologies: ['Robotics', 'Computer Vision', 'LiDAR', 'Generative Design', 'Spatial Computing']
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    slug: 'real-estate',
    shortDescription: 'Commercial leasing, residential brokerage, property management, and asset valuation.',
    heroSubtitle: 'Automating 100-page lease abstraction, hyper-localized predictive pricing, and virtual spatial staging.',
    iconName: 'Building2',
    badgeColor: 'emerald',
    practicalApplications: [
      'Zero-shot lease abstraction pulling CAM clauses, rent escalations, and renewal options in seconds',
      'Predictive tenant churn scoring based on badge-swipe data and energy utilization',
      'Generative virtual staging converting vacant spaces into customized commercial or residential layouts',
      'Automated appraisal comps adjustment with satellite and municipal permit data'
    ],
    toolsCurrentlyAvailable: [
      { name: 'Prophia', purpose: 'AI commercial lease data abstraction' },
      { name: 'Restb.ai', purpose: 'Computer vision appraisal and property condition scoring' },
      { name: 'Cherre', purpose: 'Real estate data mesh and predictive asset underwriting' }
    ],
    jobsAffected: ['Leasing Agent', 'Commercial Broker', 'Appraiser', 'Property Manager', 'Asset Manager'],
    skillsWorkersShouldLearn: ['Lease abstraction verification', 'Data-driven underwriting models', 'Prompting for localized market analysis'],
    futureOutlook: 'Due diligence timeframes will drop from 30 days to 72 hours as standardized document abstraction and municipal compliance check automate.',
    relatedTechnologies: ['NLP', 'Document AI', 'Computer Vision', 'Geospatial Analytics']
  },
  {
    id: 'artificial-intelligence',
    name: 'Artificial Intelligence',
    slug: 'artificial-intelligence',
    shortDescription: 'Foundation models, multimodal systems, autonomous agents, and inference hardware.',
    heroSubtitle: 'Unpacking the fundamental breakthroughs in reasoning, context windows, vision, and autonomous execution.',
    iconName: 'BrainCircuit',
    badgeColor: 'indigo',
    practicalApplications: [
      'Multi-agent workflow orchestration for research and data synthesis',
      'Long-context document reasoning over 2M+ tokens of engineering documentation',
      'On-device neural processing units (NPUs) running local models without internet'
    ],
    toolsCurrentlyAvailable: [
      { name: 'Gemini 3.8 Series', purpose: 'Multimodal reasoning, audio dialogue, and long context' },
      { name: 'Claude 3.7 Sonnet', purpose: 'Hybrid fast inference and deep extended thinking' },
      { name: 'Local Ollama / Llama 3', purpose: 'Private offline inferencing for sensitive data' }
    ],
    jobsAffected: ['Software Engineers', 'Product Managers', 'Knowledge Workers', 'Analysts'],
    skillsWorkersShouldLearn: ['Structured tool calling', 'System prompt engineering', 'Evaluation benchmarking', 'Data privacy compliance'],
    futureOutlook: 'Foundation models are transitioning from passive chat interfaces into active autonomous runtime agents capable of multi-step tool execution.',
    relatedTechnologies: ['LLMs', 'Multimodal Agents', 'Vector Databases', 'Synthetic Data']
  },
  {
    id: 'technology',
    name: 'Technology',
    slug: 'technology',
    shortDescription: 'Cloud infrastructure, developer platforms, cyber defense, and edge computing.',
    heroSubtitle: 'The foundational digital architecture powering modern enterprises and industrial networks.',
    iconName: 'Cpu',
    badgeColor: 'violet',
    practicalApplications: [
      'Autonomous cloud cost anomaly remediation',
      'AI-driven dynamic network traffic shaping for low-latency IoT',
      'Automated synthetic test data generation'
    ],
    toolsCurrentlyAvailable: [
      { name: 'Cloudflare Workers AI', purpose: 'Edge serverless model execution' },
      { name: 'Datadog Watchdog', purpose: 'Predictive IT infrastructure failure alerts' }
    ],
    jobsAffected: ['DevOps Engineers', 'Systems Architects', 'IT Directors'],
    skillsWorkersShouldLearn: ['Edge computing architectures', 'AI safety protocols', 'Cost per token management'],
    futureOutlook: 'By 2027, over 50% of enterprise inference will happen on edge gateways or on-premise hardware rather than centralized cloud data centers.',
    relatedTechnologies: ['Edge Computing', 'Cybersecurity', 'API Meshes']
  },
  {
    id: 'automotive',
    name: 'Automotive',
    slug: 'automotive',
    shortDescription: 'Connected vehicles, EV battery management, repair shops, and autonomous fleets.',
    heroSubtitle: 'How telematics, computer vision inspection, and predictive maintenance are transforming dealerships and repair bays.',
    iconName: 'Car',
    badgeColor: 'rose',
    practicalApplications: [
      'Drive-through camera arches scanning tire tread depth and undercarriage damage in 5 seconds',
      'Audio frequency analysis diagnosing alternator bearing play before road breakdown',
      'Predictive battery degradation modeling for commercial electric fleet optimization',
      'Automated collision repair estimating from phone photos'
    ],
    toolsCurrentlyAvailable: [
      { name: 'UVEye', purpose: 'Automated vehicle undercarriage and exterior inspection' },
      { name: 'Tractable', purpose: 'AI accident photo damage estimation' },
      { name: 'Geotab Ace', purpose: 'Fleet telematics generative assistant' }
    ],
    jobsAffected: ['Service Advisor', 'Automotive Technician', 'Fleet Manager', 'Insurance Adjuster'],
    skillsWorkersShouldLearn: ['High-voltage EV diagnostics', 'CAN bus protocol analysis', 'Digital estimate auditing'],
    futureOutlook: 'Automotive repair is transitioning from reactive repair to scheduled predictive component swaps guided by real-time vehicle telematics.',
    relatedTechnologies: ['Computer Vision', 'Acoustics', 'Telematics', 'CAN Bus', 'Digital Twins']
  },
  {
    id: 'agriculture',
    name: 'Agriculture / Farming',
    slug: 'agriculture',
    shortDescription: 'Precision farming, agronomy, livestock telemetry, and autonomous field machinery.',
    heroSubtitle: 'Using edge AI cameras, drone multispectral imagery, and robotics to slash herbicide use and maximize yields.',
    iconName: 'Wheat',
    badgeColor: 'lime',
    practicalApplications: [
      'Millisecond green-on-brown and green-on-green weed spraying reducing chemical use by 80%',
      'Multispectral drone analysis pinpointing nitrogen deficiencies across 10,000-acre parcels',
      'Autonomous tractors and combines navigating GPS-denied canopies using local vision models',
      'Computer vision monitoring of livestock weight, lameness, and calving signs'
    ],
    toolsCurrentlyAvailable: [
      { name: 'John Deere See & Spray', purpose: 'Targeted camera-actuated herbicide spraying' },
      { name: 'Carbon Robotics LaserWeeder', purpose: 'High-speed autonomous AI laser weed eradication' },
      { name: 'CattleEye', purpose: 'Autonomous dairy cow lameness detection' }
    ],
    jobsAffected: ['Farm Manager', 'Agronomist', 'Equipment Operator', 'Agricultural Mechanic'],
    skillsWorkersShouldLearn: ['Drone thermography and multispectral analysis', 'Precision GPS calibration', 'Ag data management'],
    futureOutlook: 'Precision laser weeding and micro-dosing will reduce chemical herbicide dependency by over 70% in high-value row crops by 2030.',
    relatedTechnologies: ['Robotics', 'Edge Computer Vision', 'Multispectral Imaging', 'GPS / RTK']
  },
  {
    id: 'cannabis',
    name: 'Cannabis Industry',
    slug: 'cannabis',
    shortDescription: 'Commercial cultivation, dispensary retail, regulatory compliance, and cannabinoid testing.',
    heroSubtitle: 'Bringing computer vision phenotyping, environmental HVAC optimization, and automated seed-to-sale compliance to legal operations.',
    iconName: 'Leaf',
    badgeColor: 'teal',
    practicalApplications: [
      'Early hermaphrodite and male plant detection via canopy camera arrays',
      'Autonomous powdery mildew and spider mite detection on leaf undersides',
      'Vapor pressure deficit (VPD) micro-climate optimization tied to fertigation',
      'Automated state compliance reporting and Metrc inventory reconciliation'
    ],
    toolsCurrentlyAvailable: [
      { name: 'Fluence AI Light Controls', purpose: 'Dynamic spectrum modulation for terpene maximization' },
      { name: 'GrowDoc', purpose: 'Mobile leaf disease and pest diagnosis' }
    ],
    jobsAffected: ['Master Grower', 'Compliance Officer', 'Dispensary Buyer'],
    skillsWorkersShouldLearn: ['Automated climate recipe tuning', 'Spectroscopic potency testing', 'Data-driven phenotyping'],
    futureOutlook: 'Commercial indoor grows with AI-driven closed-loop HVAC and fertigation will achieve 25% lower energy costs per gram than legacy facilities.',
    relatedTechnologies: ['Computer Vision', 'Climate Automation', 'Spectroscopy']
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    slug: 'healthcare',
    shortDescription: 'Clinical documentation, ambient medical transcription, diagnostic imaging, and nursing workflows.',
    heroSubtitle: 'How ambient clinical voice and computer vision are returning doctors from screens back to bedside patient care.',
    iconName: 'Activity',
    badgeColor: 'cyan',
    practicalApplications: [
      'Ambient microphone listening to physician-patient dialogues and drafting structured SOAP notes in real time',
      'Computer vision second-read flags on emergency chest X-rays for pneumothorax and fractures',
      'Automated prior-authorization packet compilation pulling relevant charts from EHR',
      'Early sepsis warning alerts using vitals trend prediction'
    ],
    toolsCurrentlyAvailable: [
      { name: 'Nuance DAX Copilot', purpose: 'Ambient clinical listening and note generation' },
      { name: 'Aidoc', purpose: 'FDA-cleared radiology triage and urgent finding notification' },
      { name: 'Epic Cosmos AI', purpose: 'Clinical pathway synthesis across 200M+ anonymized records' }
    ],
    jobsAffected: ['Physician', 'Medical Scribe', 'Registered Nurse', 'Radiologist', 'Medical Coder'],
    skillsWorkersShouldLearn: ['Ambient scribe review and correction', 'AI radiology alert triage', 'EHR prompt templates'],
    futureOutlook: 'Ambient listening tools will eliminate manual EHR charting for over 50% of outpatient visits by 2027, reducing clinical burnout significantly.',
    relatedTechnologies: ['Ambient Speech', 'NLP', 'Computer Vision Radiology', 'Predictive Telemetry']
  },
  {
    id: 'small-business',
    name: 'Small Business',
    slug: 'small-business',
    shortDescription: 'Local service contractors, retail stores, bookkeeping, customer service, and marketing.',
    heroSubtitle: 'Giving local 5-person operations the operational horsepower of 50-person corporations.',
    iconName: 'Store',
    badgeColor: 'orange',
    practicalApplications: [
      'AI phone dispatchers answering after-hours calls and scheduling emergency jobs directly into ServiceTitan',
      'Automated QuickBooks invoice reconciliation and receipt categorization',
      'Hyper-localized SEO content generation for neighborhood service areas',
      'Personalized review responses and Google Business profile optimization'
    ],
    toolsCurrentlyAvailable: [
      { name: 'Sapia / Bland.ai Phone Agents', purpose: 'Human-like conversational phone answering' },
      { name: 'Fathom Video Notetaker', purpose: 'Instant client consultation transcripts & action items' },
      { name: 'Ramp Intelligence', purpose: 'Expense automation and contract price comparison' }
    ],
    jobsAffected: ['Office Manager', 'Customer Service Rep', 'Bookkeeper', 'Solo Entrepreneur'],
    skillsWorkersShouldLearn: ['Conversational AI agent setup', 'No-code workflow automation (Make / Zapier)', 'Customer data safety'],
    futureOutlook: 'Independent trades and main-street shops adopting conversational AI phone agents capture 35% more after-hours revenue than competitors with voicemail.',
    relatedTechnologies: ['Conversational Voice', 'Document AI', 'Workflow Automation']
  },
  {
    id: 'software-development',
    name: 'Programming / Software Development',
    slug: 'software-development',
    shortDescription: 'Full-stack engineering, DevOps, code migration, automated testing, and security auditing.',
    heroSubtitle: 'Beyond code completion: autonomous test generation, legacy codebase refactoring, and agentic debugging.',
    iconName: 'Code',
    badgeColor: 'emerald',
    practicalApplications: [
      'Autonomous generation of regression and unit test suites from OpenAPI specs',
      'Synthesizing complex multi-file pull requests and architectural reviews',
      'Instant modernization of legacy COBOL, Fortran, or Python 2 codebases',
      'Real-time dependency security vulnerability patching'
    ],
    toolsCurrentlyAvailable: [
      { name: 'Cursor & Claude Code', purpose: 'Full-repo context agentic editing' },
      { name: 'GitHub Copilot Workspace', purpose: 'Issue-to-pull-request automation' },
      { name: 'Semgrep AI', purpose: 'Semantic code security scanning' }
    ],
    jobsAffected: ['Software Engineer', 'QA Tester', 'DevOps Specialist', 'Engineering Manager'],
    skillsWorkersShouldLearn: ['Architecture design over syntax', 'Prompt engineering for code evaluation', 'Security auditing of LLM outputs'],
    futureOutlook: 'Senior developers will evolve into orchestrators who direct swarms of agentic coders, verifying invariants and system architectures.',
    relatedTechnologies: ['Code LLMs', 'Agentic Workspaces', 'Static Analysis']
  },
  {
    id: 'robotics-automation',
    name: 'Robotics & Automation',
    slug: 'robotics-automation',
    shortDescription: 'Industrial articulated arms, autonomous mobile robots (AMRs), and humanoid factory labor.',
    heroSubtitle: 'Endowing mechanical hardware with spatial perception and vision-language-action (VLA) foundation models.',
    iconName: 'Bot',
    badgeColor: 'blue',
    practicalApplications: [
      'Vision-language-action models allowing warehouse robots to pick unfamiliar objects without retraining',
      'Autonomous mobile robots navigating dynamic distribution centers without floor magnetic strips',
      'Collaborative cobots working alongside human assembly workers on high-mix low-volume production lines'
    ],
    toolsCurrentlyAvailable: [
      { name: 'Figure 02 Humanoid', purpose: 'BMW Spartanburg plant chassis insertion and handling' },
      { name: 'Boston Dynamics Stretch', purpose: 'Autonomous trailer unloading in logistics hubs' },
      { name: 'Physical Intelligence (Pi-0)', purpose: 'Universal robot foundation model for dexterity' }
    ],
    jobsAffected: ['Warehouse Material Handler', 'Robot Programmer', 'Automation Maintenance Tech'],
    skillsWorkersShouldLearn: ['Robot simulation (Nvidia Isaac / ROS2)', 'Safety zone sensor integration', 'Hardware troubleshooting'],
    futureOutlook: 'General-purpose vision-action models will replace rigid programmable logic controller (PLC) scripting for non-repetitive picking by 2028.',
    relatedTechnologies: ['VLA Models', 'AMRs', 'Tactile Grippers', 'ROS2']
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    slug: 'manufacturing',
    shortDescription: 'CNC machining, assembly lines, predictive maintenance, quality control, and supply chains.',
    heroSubtitle: 'Zero-defect optical inspection, tool wear prediction, and adaptive process control on the factory floor.',
    iconName: 'Factory',
    badgeColor: 'amber',
    practicalApplications: [
      'Sub-millimeter optical inspection of welded seams and machined tolerances at line speed',
      'Acoustic and vibration monitoring predicting spindle motor failure 72 hours before seizure',
      'Generative toolpath optimization reducing CNC cycle times by 18%'
    ],
    toolsCurrentlyAvailable: [
      { name: 'Cognex In-Sight AI', purpose: 'Deep learning industrial vision systems' },
      { name: 'Augury Machine Health', purpose: 'Continuous mechanical vibration predictive diagnostics' }
    ],
    jobsAffected: ['CNC Machinist', 'Quality Inspector', 'Plant Manager', 'Maintenance Technician'],
    skillsWorkersShouldLearn: ['Predictive sensor interpretation', 'Generative CAM toolpath verification', 'Statistical process control'],
    futureOutlook: 'Unplanned downtime in automotive and aerospace tier-1 suppliers will drop by 45% as vibration and current monitoring become standard equipment.',
    relatedTechnologies: ['Computer Vision', 'Vibration Telemetry', 'Digital Twins']
  },
  {
    id: '3d-printing',
    name: '3D Printing',
    slug: '3d-printing',
    shortDescription: 'Additive manufacturing, metal laser sintering, generative CAD, and rapid spare-part printing.',
    heroSubtitle: 'Generative algorithms creating organic, ultra-lightweight titanium geometries that subtractive manufacturing could never cut.',
    iconName: 'Layers',
    badgeColor: 'fuchsia',
    practicalApplications: [
      'Generative design reducing aerospace bracket weight by 40% while preserving tensile strength',
      'In-situ melt-pool optical monitoring during metal powder bed fusion to detect internal porosity',
      'On-demand replacement of obsolete discontinued HVAC brackets and gears in service vans'
    ],
    toolsCurrentlyAvailable: [
      { name: 'Autodesk Generative Design', purpose: 'Algorithmically optimized stress-relieved CAD geometry' },
      { name: 'Markforged Blacksmith', purpose: 'In-process dimensional laser verification for printed parts' }
    ],
    jobsAffected: ['Mechanical Engineer', 'Additive Manufacturing Specialist', 'CAD Designer'],
    skillsWorkersShouldLearn: ['Design for Additive Manufacturing (DfAM)', 'FEA stress simulation', 'Material science of polymers and metal powders'],
    futureOutlook: 'Field service technicians will carry compact composite printers in vans to print custom replacement brackets and valve fittings on demand.',
    relatedTechnologies: ['Direct Metal Laser Sintering (DMLS)', 'Generative CAD', 'In-Situ Monitoring']
  },
  {
    id: 'consumer-technology',
    name: 'Consumer Technology',
    slug: 'consumer-technology',
    shortDescription: 'Smart home, wearables, spatial computing headsets, personal electronics, and appliances.',
    heroSubtitle: 'On-device intelligence, privacy-first local processing, and voice interfaces that finally understand context.',
    iconName: 'Smartphone',
    badgeColor: 'emerald',
    practicalApplications: [
      'Smart home thermostats using predictive occupancy models to pre-cool before utility peak rate hours',
      'Wearables detecting early illness and heart rhythm anomalies days before physical symptoms appear',
      'Real-time translation audio earbuds eliminating conversational language friction'
    ],
    toolsCurrentlyAvailable: [
      { name: 'Ray-Ban Meta Smart Glasses', purpose: 'Multimodal first-person visual recognition and lookup' },
      { name: 'Apple Vision Pro + Field Apps', purpose: 'Spatial step-by-step equipment maintenance overlays' }
    ],
    jobsAffected: ['Hardware Designers', 'App Developers', 'Field Technicians using wearable HUDs'],
    skillsWorkersShouldLearn: ['Spatial UX design', 'On-device model optimization', 'Privacy architecture'],
    futureOutlook: 'Smart glasses will become standard technician gear by 2029, projecting live wiring diagrams and multimeter readings directly into the field of view.',
    relatedTechnologies: ['Wearable Sensors', 'Spatial Audio', 'Local NPUs', 'MicroLED']
  },
  {
    id: 'future-technology',
    name: 'Future Technology',
    slug: 'future-technology',
    shortDescription: 'Quantum computing, brain-computer interfaces, room-temperature superconductors, and fusion energy.',
    heroSubtitle: 'Tracking experimental laboratory breakthroughs before they enter commercial industrial roadmaps.',
    iconName: 'Sparkles',
    badgeColor: 'purple',
    practicalApplications: [
      'Quantum chemistry simulations predicting novel battery cathode chemistries in weeks instead of years',
      'Brain-computer interfaces enabling paralyzed individuals to operate robotic prosthetics',
      'High-temperature superconducting magnets enabling compact tokamak nuclear fusion'
    ],
    toolsCurrentlyAvailable: [
      { name: 'IBM Quantum System Two', purpose: 'Utility-scale quantum experimentation' },
      { name: 'Neuralink N1 Implant', purpose: 'Direct neural motor cortex telepathic control' }
    ],
    jobsAffected: ['Materials Scientists', 'Quantum Algorithm Researchers', 'Biomedical Engineers'],
    skillsWorkersShouldLearn: ['Qiskit quantum programming', 'Electrochemical modeling', 'Cryogenic systems'],
    futureOutlook: 'Quantum simulation will deliver the first commercially viable solid-state lithium-sulfur battery for electric aviation before 2032.',
    relatedTechnologies: ['Quantum Algorithms', 'Neural Interfaces', 'Fusion Physics']
  }
];

export const SEED_ARTICLES: Article[] = [
  {
    id: 'art-hvac-vision-diagnostics',
    slug: 'ai-powered-hvac-diagnostics-what-it-actually-changes',
    title: 'OpenAI’s New Vision Technology Could Change How HVAC Technicians Diagnose Equipment',
    subheadline: 'From corroded serial plates to intricate wire schematics, multimodal computer vision is moving into the field service van. Here is what works today, what fails, and how technicians should prepare.',
    excerpt: 'Instead of spending 45 minutes digging through greasy paper schematics or illegible serial plates, technicians are pointing phone cameras at electrical panels. We tested multimodal models on 30 service call scenarios.',
    type: 'ai_in_industry',
    status: 'published',
    primaryIndustry: 'hvac',
    secondaryIndustries: ['artificial-intelligence', 'small-business'],
    tags: ['HVAC', 'Computer Vision', 'Field Service', 'Diagnostics', 'Technicians', 'Predictive Maintenance'],
    author: SEED_AUTHORS[0], // Shyam Tailor
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1400&q=80',
    coverImageCaption: 'A technician inspecting a commercial rooftop condensing unit equipped with digital sensors.',
    publishedAt: '2026-09-24T09:00:00Z',
    updatedAt: '2026-09-25T14:30:00Z',
    readingTimeMinutes: 7,
    featured: true,
    trending: true,
    views: 4820,
    whyThisMatters: 'Field technicians spend up to 25% of their billable hours searching for equipment documentation, decyphering worn wiring schematics, and waiting on hold with manufacturer technical support. Multimodal AI provides instant, contextual answers directly on a phone screen—transforming a novice technician into a seasoned troubleshooter.',
    industryImpact: {
      summary: 'High impact across residential and commercial mechanical contracting. Accelerates apprenticeship onboarding and cuts repeat truck rolls.',
      industriesAffected: [
        { name: 'HVAC & Mechanical', impact: 'Direct reduction in diagnosis time and second-trip callbacks.' },
        { name: 'Electrical Contractors', impact: 'Instant cross-referencing of breaker panel diagrams with NEC codes.' },
        { name: 'Equipment Distributors', impact: 'Decreased volume of tier-1 phone support calls from contractors.' }
      ]
    },
    takeaway: 'Computer vision will not turn wrenches or replace EPA certification, but it will separate contractors who fix problems in one trip from those who take three. Technicians should treat multimodal vision as a high-powered digital magnifying glass for schematics and error codes, while always verifying voltage and refrigerant pressures with physical calibrated meters.',
    tryItYourself: {
      title: 'Testing Multimodal AI on an Obscure Equipment Schematic',
      toolName: 'ChatGPT Plus or Gemini Advanced (Mobile App with Camera)',
      workflowStepByStep: [
        'Wipe grease and dirt off the door schematic and take a crisp photo in good light.',
        'Upload the photo with the specific sequence of operation prompt below.',
        'Compare the AI’s suggested terminal connections against your physical multimeter readings before touching wiring.',
        'Save the resulting diagnostic trail in your work order notes for the customer.'
      ],
      prompts: [
        {
          label: 'Deciphering Faded Schematic Wiring',
          promptText: 'Analyze this photo of a rooftop unit control board and door diagram. The unit is calling for cooling on Y1, but the contactor is not pulling in. Trace the safety circuit from terminal R through the high-pressure switch and flame rollouts. List the test points in order where I should check for 24VAC with my meter.',
          expectedResult: 'A step-by-step test sequence specifying terminal pins (e.g. Pin 4 to C, Pin 6 to C) to isolate the open switch.'
        },
        {
          label: 'Decyphering Corroded Model & Serial Plates',
          promptText: 'Here is a photo of a weathered serial plate on a 2004 Trane package unit. Extract the full model number, nominal tonnage, factory refrigerant charge, and year/week of manufacture based on standard Trane nomenclature.',
          expectedResult: 'Decoded tonnage (e.g. 036 = 3 Tons), R-22 charge weight, and verified serial date code.'
        }
      ],
      safetyConsiderations: 'Never touch high-voltage electrical contacts or disconnect refrigerant lines based solely on an AI suggestion. Always lock out/tag out and verify zero volts with an audited meter.'
    },
    whatToWatch: [
      {
        milestone: 'Offline Multimodal Field Models',
        timeline: 'Q1 2027',
        reason: 'Technicians often work in metal basements or remote mechanical rooms without LTE connectivity; on-device NPUs will run full schematics locally.'
      },
      {
        milestone: 'OEM Official AI Knowledge Graphs',
        timeline: 'Late 2027',
        reason: 'Carrier, Trane, and Daikin releasing verified proprietary diagnostic models linked directly to warranty databases.'
      }
    ],
    sources: [
      {
        id: 's1',
        publication: 'Air Conditioning Contractors of America (ACCA)',
        sourceTitle: 'Technician Shortage & Diagnostic Efficiency Study 2025',
        url: 'https://www.acca.org',
        publicationDate: '2025-11-12',
        dateAccessed: '2026-09-22',
        verified: true
      },
      {
        id: 's2',
        publication: 'HVAC Excellence Technical Journal',
        sourceTitle: 'Integrating Machine Vision into Apprenticeship Curriculums',
        url: 'https://www.hvacexcellence.org',
        publicationDate: '2026-02-18',
        dateAccessed: '2026-09-23',
        verified: true
      },
      {
        id: 's3',
        publication: 'OpenAI Research',
        sourceTitle: 'Multimodal Spatial Reasoning in Dense Technical Diagrams',
        url: 'https://openai.com/research',
        publicationDate: '2026-09-15',
        dateAccessed: '2026-09-24',
        verified: true
      }
    ],
    seo: {
      metaTitle: 'AI-Powered HVAC Diagnostics: What OpenAI Vision Actually Changes',
      metaDescription: 'How field technicians are using multimodal AI and computer vision to read schematics, decode serial plates, and cut service call times.',
      ogTitle: 'AI-Powered HVAC Diagnostics: What OpenAI Vision Changes in the Field',
      ogDescription: 'Real-world analysis of computer vision in HVAC repair. What works today, what fails, and how technicians can use it.'
    },
    blocks: [
      {
        id: 'b1',
        type: 'paragraph',
        content: 'When a commercial compressor locks up on an 88-degree afternoon, the technician standing on the gravel roof does not need an essay on neural network weights. They need to know why 24 volts is leaving the thermostat terminal board but failing to energize the contactor coil.'
      },
      {
        id: 'b2',
        type: 'paragraph',
        content: 'Historically, answering that question meant uncurling a faded, oil-stained paper diagram glued inside the cabinet door in 1998, squinting through grease at micro-print wire labels, and tracing colored lines that faded to gray a decade ago. If the diagram was torn or missing, the technician was stuck making a 40-minute phone call to senior dispatch or an equipment distributor counter.'
      },
      {
        id: 'b3',
        type: 'h2',
        content: 'Where Computer Vision Enters the Service Workflow'
      },
      {
        id: 'b4',
        type: 'paragraph',
        content: 'With the arrival of high-resolution multimodal vision models, the workflow is fundamentally shifting. A technician holds their smartphone camera up to the electrical bay, captures the schematic, the terminal strip, and the error LED flashing sequence, and asks a direct question: "I have 24VAC at R and C, but the fan relay is chattering. What does this board schematic show between terminal G and the relay coil?"'
      },
      {
        id: 'b5',
        type: 'callout',
        content: 'Key Technical Distinction: Current vision models excel at OCR (optical character recognition) on weathered alphanumeric plates and tracing high-contrast electrical lines. However, they frequently hallucinate intermediate relay connections if the diagram resolution drops below 300 DPI or if reflections wash out wire colors.',
        extra: { calloutVariant: 'warning' }
      },
      {
        id: 'b6',
        type: 'h2',
        content: 'Three Concrete Tasks That Work Today'
      },
      {
        id: 'b7',
        type: 'list',
        content: 'Verified Field Use Cases',
        extra: {
          items: [
            'Serial Plate Decryption: Instantly pulling tonnage, manufacture date code, and factory refrigerant weight from severely oxidized metal data tags.',
            'Blink Code & Fault LED Translation: Pointing the camera at a flashing circuit board LED and instantly getting the OEM fault code table without flipping through 90-page PDF service manuals.',
            'Universal Replacement Cross-Referencing: Photographing a burned-out fan motor rating plate (horsepower, RPM, voltage, shaft diameter, rotation direction) to find drop-in aftermarket replacements in supplier inventory.'
          ]
        }
      },
      {
        id: 'b8',
        type: 'h2',
        content: 'What Fails: The Danger of Hallucinated Voltages'
      },
      {
        id: 'b9',
        type: 'paragraph',
        content: 'The most dangerous mistake an apprentice can make is treating an AI response as physical fact. In our benchmark of 30 complex rooftop schematic photos, the model correctly identified the primary safety circuit 87% of the time. But in 4 instances, it assumed a normally closed (NC) freeze stat was normally open (NO), which would lead a technician to jump out the wrong terminal.'
      },
      {
        id: 'b10',
        type: 'quote',
        content: 'AI is the smartest apprentice you ever hired, but it has never felt 480 volts or smelled a burned-out transformer. It gives you a roadmap, but you still drive the multimeter.'
      }
    ]
  },
  {
    id: 'art-chatgpt-hvac-service-call',
    slug: 'how-an-hvac-technician-could-use-chatgpt-on-a-service-call',
    title: 'How an HVAC Technician Could Use ChatGPT on a Service Call',
    subheadline: 'A step-by-step practical guide: using conversational AI for psychrometric calculations, error code triage, and professional customer communication.',
    excerpt: 'Step-by-step workflow with real prompts, exact input data, and safety precautions showing how technicians in the field use AI to solve tricky airflow and wiring issues.',
    type: 'practical_guide',
    status: 'published',
    primaryIndustry: 'hvac',
    secondaryIndustries: ['small-business', 'artificial-intelligence'],
    tags: ['HVAC', 'Practical Guide', 'ChatGPT', 'Field Work', 'Prompts', 'Customer Service'],
    author: SEED_AUTHORS[1], // Marcus Vance
    coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=80',
    coverImageCaption: 'Digital diagnostic tools and mobile interfaces used during residential service calls.',
    publishedAt: '2026-09-22T11:15:00Z',
    updatedAt: '2026-09-23T16:00:00Z',
    readingTimeMinutes: 6,
    featured: false,
    trending: true,
    views: 3190,
    whyThisMatters: 'Technicians often struggle not with physical wrenching, but with rapid psychrometric conversions, interpreting obscure legacy error manuals, and explaining a $4,000 heat exchanger replacement to a skeptical homeowner.',
    takeaway: 'Think of ChatGPT as your virtual senior tech riding in the passenger seat. Use it to double-check target superheat calculations and draft polite, bulletproof customer invoices, but verify all pressures with calibrated digital gauges.',
    tryItYourself: {
      title: 'Customer Invoice Explanation Generator',
      toolName: 'Any LLM Assistant (ChatGPT, Claude, Gemini)',
      workflowStepByStep: [
        'Complete physical diagnosis and note technical measurements (e.g., failed run capacitor at 12 µF vs 45 µF rating, high compressor amp draw).',
        'Input raw field shorthand into the prompt below.',
        'Review the generated 3-sentence homeowner explanation.',
        'Paste directly into your digital invoice or text it to the customer.'
      ],
      prompts: [
        {
          label: 'Translating Technical Jargon to Homeowners',
          promptText: 'I just finished a service call on a 4-ton Lennox heat pump. The dual run capacitor was rated 45/5 µF but measured 11.2 µF on the herm terminal. This caused the compressor to overheat and trip on thermal overload. Write a polite, clear 3-sentence summary for the homeowner invoice explaining what broke, why it stopped cooling, and why replacing the capacitor prevented a catastrophic compressor failure.',
          expectedResult: 'A professional explanation that builds customer trust without confusing technical jargon.'
        },
        {
          label: 'Target Superheat Psychrometric Calculation',
          promptText: 'Outdoor ambient dry bulb is 92°F. Indoor return air wet bulb is 64°F. Using standard fixed orifice non-TXV charging charts, calculate the target superheat. My actual suction pressure is 118 psig on R-410A (evaporator saturation temp 40°F) and suction line temp is 58°F. Is this system undercharged, overcharged, or correct?',
          expectedResult: 'Detailed target superheat calculation (target approx 12°F) vs actual superheat (18°F) indicating slight undercharge or restricted airflow.'
        }
      ],
      safetyConsiderations: 'Never input customer private financial details, gate codes, or security alarm codes into public AI prompts.'
    },
    sources: [
      {
        id: 's4',
        publication: 'RSES Journal (Refrigeration Service Engineers Society)',
        sourceTitle: 'Field Psychrometrics and Modern Digital Tools',
        url: 'https://www.rses.org',
        publicationDate: '2026-01-10',
        dateAccessed: '2026-09-20',
        verified: true
      }
    ],
    seo: {
      metaTitle: 'How an HVAC Technician Can Use ChatGPT on a Service Call | Practical Guide',
      metaDescription: 'Step-by-step practical guide with prompts for HVAC technicians using AI for psychrometrics, customer explanations, and error code troubleshooting.',
      ogTitle: 'How an HVAC Technician Can Use ChatGPT on a Service Call',
      ogDescription: 'Real workflows, copyable prompts, and safety considerations for HVAC contractors.'
    },
    blocks: [
      {
        id: 'b20',
        type: 'paragraph',
        content: 'Most tutorials on ChatGPT are written for copywriters and programmers. But the people who can benefit most from fast, accurate language synthesis are tradespeople standing in a hot attic or in front of an angry homeowner.'
      },
      {
        id: 'b21',
        type: 'h2',
        content: 'Use Case 1: The "Why Does This Cost $1,200?" Customer Summary'
      },
      {
        id: 'b22',
        type: 'paragraph',
        content: 'A skilled technician can diagnose a cracked secondary heat exchanger in six minutes. But explaining why that hairline fracture is spewing carbon monoxide without terrifying the customer—or sounding like a sleazy salesman pushing an unnecessary furnace swap—can take an hour.'
      },
      {
        id: 'b23',
        type: 'prompt',
        content: 'Prompt Template for Homeowner Invoice Summary',
        extra: {
          promptExampleInput: 'Equipment: 2012 Bryant 90% condensing furnace. Issue: Secondary heat exchanger blocked and fractured along seam. Flue gas CO measured 420 PPM. Combustion safety switch opened. Recommend full replacement.',
          promptExampleOutput: 'During our safety inspection, we discovered that the furnace\'s secondary heat exchanger—which contains the combustion fumes while warming your indoor air—has developed a hairline crack and is emitting dangerous carbon monoxide levels (420 PPM). For your family\'s safety, the unit has been locked out per mechanical code. Because this is the core heating chamber of a 14-year-old system, replacement is required to restore safe heat.'
        }
      },
      {
        id: 'b24',
        type: 'h2',
        content: 'Use Case 2: Obscure OEM Dipswitch Configurations'
      },
      {
        id: 'b25',
        type: 'paragraph',
        content: 'Variable-speed ECM blower motors often require specific 8-position dipswitch settings for CFM airflow matching. Instead of fumbling through a greasy 120-page PDF manual on your phone screen, provide the model and target tonnage to get the switch positions instantly.'
      }
    ]
  },
  {
    id: 'art-technician-2030-copilot',
    slug: 'the-technician-of-2030-may-work-with-an-ai-copilot',
    title: 'The Technician of 2030 May Work With an AI Copilot: 3, 5, and 10-Year Projections',
    subheadline: 'Analyzing the trajectory of wearable HUDs, acoustic telemetry, and predictive diagnostics. What is confirmed fact, what is industry consensus, and what is speculation.',
    excerpt: 'Will tradespeople be replaced by robots, or will augmented technicians out-earn software developers? We break down the economic, labor, and hardware milestones for skilled trades over the next decade.',
    type: 'trend_analysis',
    status: 'published',
    primaryIndustry: 'hvac',
    secondaryIndustries: ['robotics-automation', 'construction-trades', 'future-technology'],
    tags: ['Future of Work', 'HVAC', 'Copilots', 'Robotics', 'Trades', 'Economic Analysis'],
    author: SEED_AUTHORS[0], // Shyam Tailor
    coverImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1400&q=80',
    coverImageCaption: 'Next-generation industrial testing with augmented digital telemetry overlays.',
    publishedAt: '2026-09-18T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z',
    readingTimeMinutes: 10,
    featured: true,
    trending: false,
    views: 6240,
    whyThisMatters: 'With a projected shortage of 110,000 HVAC technicians and 250,000 electricians in North America by 2030, productivity per worker must double. AI copilots and augmented reality are the only realistic bridge to close the gap.',
    takeaway: 'The trade worker of 2030 will not be replaced by a humanoid robot. Instead, the technician will become a high-value field operator wearing lightweight smart glasses, carrying automated acoustic diagnostic probes, and directing predictive maintenance schedules for 5x more buildings than today.',
    sources: [
      {
        id: 's5',
        publication: 'Bureau of Labor Statistics (BLS)',
        sourceTitle: 'Skilled Trades Employment Projections 2024-2034',
        url: 'https://www.bls.gov/ooh/installation-maintenance-and-repair/heating-air-conditioning-and-refrigeration-mechanics-and-installers.htm',
        publicationDate: '2025-09-10',
        dateAccessed: '2026-09-15',
        verified: true
      },
      {
        id: 's6',
        publication: 'McKinsey & Company Capital Projects',
        sourceTitle: 'The Augmented Field Workforce: Closing the Industrial Skilled Trades Gap',
        url: 'https://www.mckinsey.com',
        publicationDate: '2026-04-12',
        dateAccessed: '2026-09-16',
        verified: true
      }
    ],
    seo: {
      metaTitle: 'The Technician of 2030: AI Copilots, Wearables, and the Future of Skilled Trades',
      metaDescription: '3-year, 5-year, and 10-year outlook on how artificial intelligence and augmented reality will reshape HVAC, electrical, and plumbing trades.',
      ogTitle: 'The Technician of 2030 May Work With an AI Copilot',
      ogDescription: 'Deep trend analysis distinguishing confirmed technological facts from future predictions for the trades.'
    },
    blocks: [
      {
        id: 'b30',
        type: 'paragraph',
        content: 'Every technology hype cycle follows a predictable script: technologists predict that blue-collar physical labor is five minutes away from being fully automated by humanoid androids. Yet in 2026, when a chilled-water pump seal blows in a hospital sub-basement, an actual human being with steel-toed boots, a spud wrench, and twenty years of experience still has to crawl into the dark to fix it.'
      },
      {
        id: 'b31',
        type: 'h2',
        content: 'Fact vs. Analysis vs. Speculation'
      },
      {
        id: 'b32',
        type: 'callout',
        content: 'Confirmed Fact: Over 40% of the active commercial HVAC technician workforce in the United States is currently aged 52 or older, with retirements outpacing trade school graduates by 2.4 to 1.',
        extra: { calloutVariant: 'insight', factType: 'confirmed_fact' }
      },
      {
        id: 'b33',
        type: 'callout',
        content: 'Industry Analysis: To maintain current building infrastructure without catastrophic backlogs, average technician labor productivity must increase by at least 35% by 2030.',
        extra: { calloutVariant: 'info', factType: 'industry_analysis' }
      },
      {
        id: 'b34',
        type: 'callout',
        content: '10-Year Speculation: General-purpose mobile humanoid robots will begin handling hazardous attic ductwork and crawlspace pipe soldering under human tele-operation by 2035.',
        extra: { calloutVariant: 'warning', factType: 'prediction' }
      },
      {
        id: 'b35',
        type: 'h2',
        content: 'The 3-Year Horizon (2026–2029): The Connected Tablet & Smart Audio'
      },
      {
        id: 'b36',
        type: 'paragraph',
        content: 'Over the next 36 months, the standard toolbag will not change drastically, but the digital toolbelt will. Bluetooth pressure probes, thermal camera dongles, and wireless clamp meters will stream data continuously to local AI agents running on ruggedized field tablets.'
      },
      {
        id: 'b37',
        type: 'h2',
        content: 'The 5-Year Horizon (2029–2031): Smart Glasses with Reticle Overlays'
      },
      {
        id: 'b38',
        type: 'paragraph',
        content: 'As optical waveguides drop below 60 grams, technicians will wear prescription smart safety glasses. Looking at a complex commercial VRF manifold will instantly overlay color-coded high-side and low-side pressures and highlight potential flare-nut refrigerant leaks in augmented magenta.'
      }
    ]
  },
  {
    id: 'art-construction-robotics-bim',
    slug: 'robotics-and-edge-computer-vision-on-construction-jobsites',
    title: 'Robotics and Edge Computer Vision on Job Sites: Reducing Rework and OSHA Incidents',
    subheadline: 'How autonomous floor printers, helmet-mounted 360 cameras, and AI schedule estimators are tackling construction’s $1.8 trillion productivity drag.',
    excerpt: 'Construction rework consumes 5% of total project budgets. We inspect how general contractors are using computer vision and autonomous layout rovers on active high-rise slabs.',
    type: 'ai_in_industry',
    status: 'published',
    primaryIndustry: 'construction-trades',
    secondaryIndustries: ['robotics-automation', 'artificial-intelligence'],
    tags: ['Construction', 'BIM', 'Robotics', 'Jobsite Safety', 'Computer Vision'],
    author: SEED_AUTHORS[1], // Marcus Vance
    coverImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1400&q=80',
    coverImageCaption: 'A high-rise commercial construction site utilizing automated reality capture and BIM layout systems.',
    publishedAt: '2026-09-20T08:30:00Z',
    updatedAt: '2026-09-21T10:00:00Z',
    readingTimeMinutes: 8,
    featured: false,
    trending: true,
    views: 3950,
    whyThisMatters: 'Disputes, schedule delays, and physical rework caused by discrepancies between 2D architectural drawings and actual concrete pours cost the construction industry billions annually. Automated visual comparison catches mistakes before concrete hardens.',
    takeaway: 'Layout robotics and AI visual progress capture give general contractors an infallible daily record of truth. The winners in commercial building are those who catch structural collisions in the digital model rather than with a jackhammer on the jobsite.',
    sources: [
      {
        id: 's7',
        publication: 'Dodge Construction Network',
        sourceTitle: 'World Green Building and Digital Jobsite Trends 2026',
        url: 'https://www.construction.com',
        publicationDate: '2026-03-01',
        dateAccessed: '2026-09-18',
        verified: true
      }
    ],
    seo: {
      metaTitle: 'Robotics & Edge Computer Vision in Construction: Cutting Rework in 2026',
      metaDescription: 'How autonomous layout rovers, 360-degree helmet cameras, and BIM computer vision are saving commercial general contractors millions.',
      ogTitle: 'Robotics and Edge Computer Vision on Job Sites',
      ogDescription: 'Real-world analysis of layout robotics and safety vision in commercial construction.'
    },
    blocks: [
      {
        id: 'b40',
        type: 'paragraph',
        content: 'When an electrical contractor cores a four-inch hole through a post-tensioned concrete slab only to discover they severed a water main stub-up placed 6 inches out of spec by the plumbing crew, the resulting repair costs easily exceed $25,000 and stall two floors of drywall framing.'
      },
      {
        id: 'b41',
        type: 'h2',
        content: 'The Autonomous Chalk Line: Field Printers on Slabs'
      },
      {
        id: 'b42',
        type: 'paragraph',
        content: 'Instead of two layout workers pulling tape measures across a dusty 40,000-square-foot slab with chalk lines, autonomous layout rovers linked to robotic total stations roll smoothly across the concrete, printing full-scale CAD drawings, wall track lines, door swings, and pipe penetration points directly onto the slab in durable ink.'
      }
    ]
  },
  {
    id: 'art-real-estate-lease-abstraction',
    slug: 'autonomous-lease-abstraction-and-ai-valuation-in-commercial-real-estate',
    title: 'Autonomous Lease Abstraction and AI Valuation in Commercial Real Estate',
    subheadline: 'How 120-page commercial lease agreements are parsed in 90 seconds, changing underwriting timelines from weeks to hours.',
    excerpt: 'Commercial landlords and REITs manage portfolios with thousands of legacy tenant leases. We look at how zero-shot document models parse operating expenses, termination clauses, and rent escalations.',
    type: 'tool_breakdown',
    status: 'published',
    primaryIndustry: 'real-estate',
    secondaryIndustries: ['artificial-intelligence', 'small-business'],
    tags: ['Real Estate', 'Commercial Leasing', 'Document AI', 'PropTech', 'Asset Management'],
    author: SEED_AUTHORS[2], // Elena Rostova
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80',
    coverImageCaption: 'Commercial office and mixed-use towers managed via algorithmic asset management platforms.',
    publishedAt: '2026-09-17T14:00:00Z',
    updatedAt: '2026-09-18T09:00:00Z',
    readingTimeMinutes: 6,
    featured: false,
    trending: false,
    views: 2890,
    whyThisMatters: 'Missed lease expiration notices, miscalculated Common Area Maintenance (CAM) reconciliations, and ambiguous co-tenancy clauses cost commercial landlords millions. Automated document AI eliminates manual transcription errors.',
    takeaway: 'Real estate analysts will spend less time copy-pasting numbers from scanned PDFs into Excel and more time running strategic tenant retention and capital expenditure scenarios.',
    sources: [
      {
        id: 's8',
        publication: 'Urban Land Institute (ULI)',
        sourceTitle: 'Emerging Trends in Real Estate 2026 Report',
        url: 'https://uli.org',
        publicationDate: '2025-10-25',
        dateAccessed: '2026-09-12',
        verified: true
      }
    ],
    seo: {
      metaTitle: 'Autonomous Lease Abstraction in Commercial Real Estate | Tailor Trends',
      metaDescription: 'How document AI extracts rent rolls, CAM caps, and termination rights from commercial leases in seconds.',
      ogTitle: 'Autonomous Lease Abstraction and AI Valuation in Commercial Real Estate',
      ogDescription: 'Deep dive into PropTech document AI and automated underwriting.'
    },
    blocks: [
      {
        id: 'b50',
        type: 'paragraph',
        content: 'In commercial real estate, data is trapped inside scanned PDF files executed thirty years ago. A single 150-page anchor tenant lease contains nested formulas for base rent escalations, gross-up provisions for operating expenses, exclusivity covenants, and co-tenancy clauses.'
      }
    ]
  },
  {
    id: 'art-ag-weed-detection',
    slug: 'autonomous-weed-detection-with-edge-ai-real-economics-for-row-crop-farmers',
    title: 'Autonomous Weed Detection with Edge AI: The Real Economics for Row-Crop Farmers',
    subheadline: 'High-speed camera booms identify and blast weeds with targeted micro-jets at 14 mph, cutting chemical herbicide costs by 80%.',
    excerpt: 'Herbicide-resistant weeds like Palmer amaranth threaten Midwestern yields. We examine the ROI, computer vision hardware, and chemical savings of smart boom sprayers.',
    type: 'ai_in_industry',
    status: 'published',
    primaryIndustry: 'agriculture',
    secondaryIndustries: ['robotics-automation', 'artificial-intelligence'],
    tags: ['Agriculture', 'Farming', 'Computer Vision', 'Edge AI', 'Robotics', 'Sustainability'],
    author: SEED_AUTHORS[1], // Marcus Vance
    coverImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1400&q=80',
    coverImageCaption: 'Autonomous agricultural sprayers operating across expansive grain fields with precision nozzles.',
    publishedAt: '2026-09-15T12:00:00Z',
    updatedAt: '2026-09-16T15:30:00Z',
    readingTimeMinutes: 7,
    featured: false,
    trending: false,
    views: 3410,
    whyThisMatters: 'Farmers spend over $65 per acre on chemical crop protection, while weeds grow increasingly immune to glyphosate. Precision targeted spraying slashes input costs while preventing chemical runoff into local watersheds.',
    takeaway: 'Targeted spraying demonstrates the purest economic argument for edge AI: immediate, quantifiable 70–80% cost reduction on high-dollar chemicals, paying for equipment upgrades in under two harvest seasons.',
    sources: [
      {
        id: 's9',
        publication: 'American Society of Agricultural and Biological Engineers (ASABE)',
        sourceTitle: 'Field Performance of Optical Spot Spraying in Corn and Soybean Systems',
        url: 'https://asabe.org',
        publicationDate: '2026-04-05',
        dateAccessed: '2026-09-10',
        verified: true
      }
    ],
    seo: {
      metaTitle: 'Autonomous Weed Detection with Edge AI: Economics for Row-Crop Farmers',
      metaDescription: 'How smart sprayers and computer vision cut farm herbicide costs by 80% while fighting resistant weeds.',
      ogTitle: 'Autonomous Weed Detection with Edge AI',
      ogDescription: 'Real economic breakdown of smart sprayers in modern agriculture.'
    },
    blocks: [
      {
        id: 'b60',
        type: 'paragraph',
        content: 'Broadcast spraying has been the bedrock of industrial farming for seventy years: drive a 120-foot boom across a field and drench every square inch in chemical herbicide, whether a weed is present or not.'
      }
    ]
  },
  {
    id: 'art-healthcare-ambient-scribe',
    slug: 'ambient-clinical-intelligence-how-doctors-are-reclaiming-2-hours-per-shift',
    title: 'Ambient Clinical Intelligence: How Doctors Are Reclaiming 2 Hours per Shift',
    subheadline: 'Listening microphones in exam rooms draft compliant SOAP notes into the EHR in real time. We analyze accuracy, patient consent, and clinician burnout.',
    excerpt: 'Physicians spend up to 2 hours in the electronic health record for every 1 hour of direct face-to-face patient care. Ambient AI listening tools are reversing the pajama time epidemic.',
    type: 'tool_breakdown',
    status: 'published',
    primaryIndustry: 'healthcare',
    secondaryIndustries: ['artificial-intelligence', 'small-business'],
    tags: ['Healthcare', 'Ambient AI', 'Clinical Notes', 'Physician Burnout', 'EHR'],
    author: SEED_AUTHORS[2], // Elena Rostova
    coverImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1400&q=80',
    coverImageCaption: 'A physician conducting a patient consultation without having to type into a laptop workstation.',
    publishedAt: '2026-09-12T16:00:00Z',
    updatedAt: '2026-09-14T10:00:00Z',
    readingTimeMinutes: 8,
    featured: false,
    trending: false,
    views: 4120,
    whyThisMatters: 'Doctor burnout from administrative data entry is a major driver of early medical retirements. Ambient listening restores direct eye contact between patient and physician.',
    takeaway: 'Ambient clinical listening represents one of the most mature applications of conversational AI. It proves that technology is best when it fades into the background and lets humans do what they do best.',
    sources: [
      {
        id: 's10',
        publication: 'New England Journal of Medicine (NEJM AI)',
        sourceTitle: 'Impact of Ambient Voice Documentation on Physician Wellbeing and Chart Accuracy',
        url: 'https://ai.nejm.org',
        publicationDate: '2026-01-22',
        dateAccessed: '2026-09-08',
        verified: true
      }
    ],
    seo: {
      metaTitle: 'Ambient Clinical Intelligence: How Doctors Reclaim 2 Hours per Shift',
      metaDescription: 'Examining the clinical impact of ambient AI scribes that listen to patient visits and draft EHR notes.',
      ogTitle: 'Ambient Clinical Intelligence: Reclaiming Doctor Time',
      ogDescription: 'Real-world analysis of ambient medical voice technology in clinics.'
    },
    blocks: [
      {
        id: 'b70',
        type: 'paragraph',
        content: 'For twenty years, the universal experience of visiting a doctor has been staring at the back of a clinician’s laptop while they furiously click dropdown menus in Epic or Cerner.'
      }
    ]
  }
];

export const SEED_STORY_IDEAS: StoryIdea[] = [
  {
    id: 'idea-1',
    technology: 'Computer Vision',
    industry: 'HVAC',
    possibleHeadline: 'Can iPhone Thermal Cameras Combined with Local AI Diagnose Refrigerant Leaks in 60 Seconds?',
    whyTheTopicMatters: 'Finding micro-leaks in 400-foot commercial refrigerant lines currently requires soap bubbles, electronic sniffers, and hours of pressure testing with expensive nitrogen.',
    questionsWorthInvestigating: [
      'What temperature delta is required for infrared vision to reliably spot R-454B vapor escaping under 250 PSI?',
      'Are current smartphone thermal sensors sensitive enough (NETD < 40mK)?',
      'What do OEM compressor warranties say about AI-assisted leak sealants?'
    ],
    possibleSources: ['Flir Industrial Systems', 'Carrier Applied Engineering Support', 'RSES Educational Board'],
    potentialIndustryImpact: 'Could save commercial supermarkets millions in annual refrigerant loss and prevent EPA ozone compliance fines.',
    dateAdded: '2026-09-26',
    status: 'exploring'
  },
  {
    id: 'idea-2',
    technology: 'AI Agents',
    industry: 'Real Estate',
    possibleHeadline: 'Autonomous Property Managers: How AI Phone Dispatchers Handle 2 AM Plumbing Emergencies',
    whyTheTopicMatters: 'Tenant turnover is heavily driven by slow maintenance response times. AI agents can triage water leaks, verify shutoff valve locations with tenants, and dispatch approved plumbers automatically.',
    questionsWorthInvestigating: [
      'How does the agent verify that the caller is an authorized leaseholder before dispatching a $400 emergency trade vendor?',
      'Can the agent guide a panicked tenant over phone audio to shut off the main water valve?',
      'What are the liability terms if an agent misdiagnoses an electrical fire hazard?'
    ],
    possibleSources: ['National Apartment Association (NAA)', 'ServiceTitan Developer API Team', 'Bland.ai Conversational Voice'],
    potentialIndustryImpact: 'Reduces landlord property damage claims by up to 35% through faster emergency shutoff response.',
    dateAdded: '2026-09-25',
    status: 'new'
  },
  {
    id: 'idea-3',
    technology: 'Robotics',
    industry: 'Construction & Skilled Trades',
    possibleHeadline: 'Drywall Finishing Robots on High-Rise Slabs: Replacing or Assisting Tapers?',
    whyTheTopicMatters: 'Drywall taping and mudding causes high rates of shoulder and rotator cuff disability among tradespeople. Autonomous sanding robots eliminate airborne silica dust exposure.',
    questionsWorthInvestigating: [
      'Can robotic arms achieve Level 5 smooth wall finish without human touch-up?',
      'How do robots handle uneven framing tolerances or bowed studs?',
      'What is the union response in major markets like Chicago and New York?'
    ],
    possibleSources: ['Canvas Robotics', 'International Union of Painters and Allied Trades (IUPAT)', 'Turner Construction Innovation Lab'],
    potentialIndustryImpact: 'Dramatically improves worker longevity and reduces repetitive strain injury claims.',
    dateAdded: '2026-09-24',
    status: 'new'
  },
  {
    id: 'idea-4',
    technology: 'Generative AI',
    industry: 'Healthcare',
    possibleHeadline: 'Automating the Prior Authorization Nightmare: Can AI Force Insurers to Settle Faster?',
    whyTheTopicMatters: 'Patients wait an average of 14 days for insurance approval on life-saving MRIs and oncology medications because of manual prior-authorization bureaucracy.',
    questionsWorthInvestigating: [
      'How are hospitals using LLMs to compile medical records directly against payer denial guidelines?',
      'Are insurance companies deploying retaliatory algorithmic denial algorithms?',
      'What federal CMS regulations govern automated claims decisions?'
    ],
    possibleSources: ['American Medical Association (AMA)', 'Centers for Medicare & Medicaid Services (CMS)', 'Doximity Tech'],
    potentialIndustryImpact: 'Cuts administrative overhead by 60% and gets patients onto critical therapies within 48 hours.',
    dateAdded: '2026-09-22',
    status: 'exploring'
  },
  {
    id: 'idea-5',
    technology: 'Machine Learning',
    industry: 'Agriculture / Farming',
    possibleHeadline: 'Acoustic Monitoring of Swine Herds: Detecting Respiratory Disease 4 Days Before Symptoms Appear',
    whyTheTopicMatters: 'Swine flu and PRRS can wipe out entire hog barns. Continuous microphone audio analysis detects distinctive cough frequencies days before visible illness.',
    questionsWorthInvestigating: [
      'What is the true positive rate in noisy commercial barns with exhaust fans running at 100%?',
      'How does early detection reduce prophylactic antibiotic usage?',
      'What is the cost per barn to install edge audio nodes?'
    ],
    possibleSources: ['Boehringer Ingelheim Animal Health', 'Pork Checkoff', 'Iowa State Veterinary College'],
    potentialIndustryImpact: 'Prevents mass livestock mortality and reduces farm financial risk.',
    dateAdded: '2026-09-20',
    status: 'new'
  }
];

export const SEED_NEWS_INBOX: NewsInboxItem[] = [
  {
    id: 'inbox-1',
    title: 'Siemens and Daikin Launch Cloud Predictive Vibration Telemetry for Industrial Chillers',
    sourceName: 'ACHR News',
    sourceUrl: 'https://www.achrnews.com',
    snippet: 'New wireless piezoelectric vibration sensors mount magnetically to compressor casings, feeding neural models that forecast bearing seizure 90 days in advance.',
    publishedDate: '2026-09-27',
    industry: 'HVAC',
    technology: 'Acoustic Telemetry & IoT',
    status: 'inbox',
    editorialNotes: 'Great angle for an AI in Industry piece focusing on commercial chiller maintenance contracts.'
  },
  {
    id: 'inbox-2',
    title: 'Nvidia Unveils Isaac ROS 3.2 with Micro-Second Tactile Feedback for Assembly Cobots',
    sourceName: 'Robotics Business Review',
    sourceUrl: 'https://www.roboticsbusinessreview.com',
    snippet: 'Enables industrial articulated arms to seat fragile wire harnesses into automobile dashboards using synthetic neural tactile sensors.',
    publishedDate: '2026-09-26',
    industry: 'Manufacturing',
    technology: 'Robotics & Tactile AI',
    status: 'inbox'
  },
  {
    id: 'inbox-3',
    title: 'FDA Approves First Autonomous Primary Care Retinopathy Screening System Without Physician Read',
    sourceName: 'MedTech Dive',
    sourceUrl: 'https://www.medtechdive.com',
    snippet: 'Primary care clinics can now bill Medicare for diabetic retinopathy screenings conducted entirely by an automated fundus camera and AI classifier.',
    publishedDate: '2026-09-25',
    industry: 'Healthcare',
    technology: 'Computer Vision',
    status: 'saved'
  },
  {
    id: 'inbox-4',
    title: 'Deere Partners with Starlink for Gigabit Machine-to-Cloud Telemetry Across Remote Australian Wheat Belts',
    sourceName: 'AgFunderNews',
    sourceUrl: 'https://agfundernews.com',
    snippet: 'Combines operating in zero-cell-coverage regions can now stream live yield maps and weed coordinates to cloud models without daily thumb-drive downloads.',
    publishedDate: '2026-09-24',
    industry: 'Agriculture / Farming',
    technology: 'Satellite Telematics & Edge AI',
    status: 'research',
    editorialNotes: 'Connects to our story on precision weed detection economics.'
  }
];

export const SEED_RESEARCH_PROJECTS: ResearchProject[] = [
  {
    id: 'proj-1',
    topic: 'Acoustic Vibration Diagnostics in Commercial Chillers',
    industry: 'hvac',
    status: 'research',
    targetArticleType: 'ai_in_industry',
    questionsToInvestigate: [
      'What specific bearing degradation frequencies (BPFI, BPFO) can non-invasive accelerometers catch?',
      'How does oil viscosity change the acoustic signature?',
      'What is the payback period for a 500-ton central plant installation?'
    ],
    notes: [
      {
        id: 'n1',
        type: 'stat',
        content: 'Unplanned industrial chiller downtime costs average $18,000 per hour in pharmaceutical cleanrooms and data centers.',
        sourceUrl: 'https://www.achrnews.com',
        createdAt: '2026-09-26T10:00:00Z'
      },
      {
        id: 'n2',
        type: 'quote',
        content: '"Technicians used to put a screwdriver to their ear and touch the compressor housing to listen for rough bearings. Modern sensors just digitize that human instinct."',
        authorOrSpeaker: 'Tom Henderson, Master Chiller Technician',
        createdAt: '2026-09-26T11:30:00Z'
      }
    ],
    createdAt: '2026-09-26T09:00:00Z',
    updatedAt: '2026-09-27T14:00:00Z'
  }
];
