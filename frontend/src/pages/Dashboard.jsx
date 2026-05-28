import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Shield, FileText, Search, Activity, Settings, Upload,
    CheckCircle, AlertOctagon, X, LogOut, Menu, Brain,
    TrendingUp, AlertTriangle, Clock, Eye, Download, Filter,
    User, Code, Building2, ShoppingBag, ArrowLeftRight
} from 'lucide-react';
import CompareTab from '../components/CompareTab';

// ─── Persona Definitions ───
const PERSONAS = [
    { id: 'Employee', label: 'Employee', icon: User, emoji: '👤', color: 'blue', desc: 'Employment-specific risks' },
    { id: 'Freelancer', label: 'Freelancer', icon: Code, emoji: '🧑‍💻', color: 'purple', desc: 'IP transfer, payment risks' },
    { id: 'Small Business', label: 'Small Business', icon: Building2, emoji: '🏢', color: 'green', desc: 'Vendor liability, compliance' },
    { id: 'Consumer', label: 'Consumer', icon: ShoppingBag, emoji: '👤', color: 'orange', desc: 'Privacy, auto-renewal, arbitration' },
];

// ─── Per-Persona Debate Data ───
const PERSONA_DEBATES = {
    Employee: {
        scores: { overall: '7.2', compliance: '8/10', financial: '6/10', liabilities: '9/10' },
        findings: [
            'Non-compete clause restricts employment for 5 years — exceeds the 1-2 year industry standard.',
            'Liability cap at one month salary is below market standards for employees.',
            'IP assignment covers all work done on personal equipment outside work hours.',
        ],
        debate: [
            { agent: 'Prosecutor', text: 'The 5-year non-compete is unreasonable and likely unenforceable. It severely limits career mobility.', color: 'red' },
            { agent: 'Defense', text: 'The extended period is justified to protect proprietary algorithms and business interests.', color: 'green' },
        ],
        rounds: [
            {
                topic: 'Non-Compete (5 Years)', severity: 'critical', prosecutor: 'This non-compete exceeds the CUAD dataset median of 1.2 years by 4x. In California, it is outright unenforceable.', defense: 'The employee will have access to core algorithmic IP worth millions. Standard 1-2 year periods may not adequately protect this.', verdict: 'Duration is excessive. Recommend 12-18 months with limited geographic scope.'
            },
            { topic: 'Liability Cap (1 Month)', severity: 'high', prosecutor: 'Capping employer liability at one month salary is unconscionable and leaves the employee exposed.', defense: 'Liability caps are standard and apply only to contractual claims, not statutory rights.', verdict: 'Cap should be raised to 6-12 months salary with carve-outs for negligence.' },
            { topic: 'IP Assignment on Personal Equipment', severity: 'medium', prosecutor: 'Blanket IP assignment of personal-time work is overly broad and may capture unrelated projects.', defense: 'Major tech companies include similar provisions to protect legitimate business interests.', verdict: 'Narrow scope to work directly related to employer business. Add personal project carve-out.' },
        ],
    },
    Freelancer: {
        scores: { overall: '8.1', compliance: '5/10', financial: '9/10', liabilities: '7/10' },
        findings: [
            'IP transfer clause assigns ALL deliverables permanently with no license-back to the freelancer.',
            'Payment terms allow Net-90 with no late payment penalties — high cash flow risk.',
            'No kill fee or cancellation clause — project can be terminated without compensation for work done.',
        ],
        debate: [
            { agent: 'Prosecutor', text: 'The blanket IP transfer with zero license-back means the freelancer loses all portfolio rights.', color: 'red' },
            { agent: 'Defense', text: 'Full IP transfer is standard for work-for-hire arrangements in most jurisdictions.', color: 'green' },
        ],
        rounds: [
            { topic: 'IP Transfer with No License-Back', severity: 'critical', prosecutor: 'The freelancer permanently loses all rights to their work, including portfolio usage. This is punitive for independent creators.', defense: 'Clients paying for custom work reasonably expect full ownership. This is standard work-for-hire.', verdict: 'Add a limited license-back for portfolio and self-promotion purposes. This is industry best practice.' },
            { topic: 'Net-90 Payment Terms', severity: 'high', prosecutor: 'Net-90 with no late penalty creates severe cash flow risk for freelancers who depend on timely payment.', defense: 'Large organizations have standard AP cycles. Net-90 is not unusual for enterprise clients.', verdict: 'Recommend Net-30 with 1.5% monthly late fee. Require 50% upfront for projects over $5K.' },
            { topic: 'No Kill Fee / Cancellation Clause', severity: 'high', prosecutor: 'Client can cancel mid-project with zero compensation for completed work. This is exploitative.', defense: 'Cancellation flexibility is needed for changing business priorities.', verdict: 'Add a kill fee of at least 25% of remaining project value plus payment for all completed milestones.' },
        ],
    },
    'Small Business': {
        scores: { overall: '6.8', compliance: '9/10', financial: '7/10', liabilities: '8/10' },
        findings: [
            'Vendor indemnification clause creates unlimited liability exposure for the small business.',
            'Auto-renewal with 90-day cancellation window locks the business into long-term commitments.',
            'Data processing terms do not meet GDPR requirements — compliance risk for EU customers.',
        ],
        debate: [
            { agent: 'Prosecutor', text: 'Unlimited indemnification for a small business vendor is disproportionate and could bankrupt the company.', color: 'red' },
            { agent: 'Defense', text: 'Indemnification is standard in B2B contracts to protect against third-party claims.', color: 'green' },
        ],
        rounds: [
            { topic: 'Unlimited Vendor Indemnification', severity: 'critical', prosecutor: 'Uncapped indemnification could wipe out a small business. This is a bankruptcy-level risk.', defense: 'Indemnification clauses are standard and necessary for enterprise compliance requirements.', verdict: 'Cap indemnification at the total contract value or annual fees paid. Add insurance requirements.' },
            { topic: 'Auto-Renewal with 90-Day Window', severity: 'high', prosecutor: '90-day cancellation notice is excessive and traps SMBs in unwanted renewals.', defense: 'Auto-renewal provides service continuity and predictable revenue for both parties.', verdict: 'Reduce notice period to 30 days. Add email reminder requirement 60 days before renewal.' },
            { topic: 'GDPR Non-Compliant Data Terms', severity: 'medium', prosecutor: 'Missing DPA and standard contractual clauses expose the business to regulatory fines up to 4% of revenue.', defense: 'Data processing terms can be supplemented with a separate DPA addendum.', verdict: 'Require a compliant Data Processing Agreement as an appendix before signing.' },
        ],
    },
    Consumer: {
        scores: { overall: '7.5', compliance: '6/10', financial: '5/10', liabilities: '8/10' },
        findings: [
            'Mandatory arbitration clause waives the right to sue or join class-action lawsuits.',
            'Auto-renewal charges monthly with no clear cancellation process described.',
            'Privacy policy allows sharing personal data with unnamed "business partners" without consent.',
        ],
        debate: [
            { agent: 'Prosecutor', text: 'Mandatory arbitration strips consumers of fundamental legal rights and favors the corporation.', color: 'red' },
            { agent: 'Defense', text: 'Arbitration provides faster, cheaper dispute resolution for both parties.', color: 'green' },
        ],
        rounds: [
            { topic: 'Mandatory Arbitration / Class Action Waiver', severity: 'critical', prosecutor: 'This clause eliminates the consumer right to a jury trial and blocks class actions, which are often the only practical recourse for small-dollar claims.', defense: 'Arbitration is faster, less costly, and Supreme Court precedent (AT&T v.Concepcion) upholds these clauses.', verdict: 'While likely enforceable, this is consumer-hostile. Consider services with opt-out provisions.' },
            { topic: 'Auto-Renewal with No Clear Cancellation', severity: 'high', prosecutor: 'No clear cancellation method violates FTC guidelines and many state auto-renewal laws (e.g., California ARL).', defense: 'Cancellation instructions are available in the account settings and help center.', verdict: 'This may violate automatic renewal laws. The cancellation process must be clearly disclosed at sign-up.' },
            { topic: 'Broad Data Sharing with "Business Partners"', severity: 'high', prosecutor: 'Sharing personal data with unnamed third parties without explicit consent violates GDPR principles and erodes trust.', defense: 'Data sharing with partners is necessary for service functionality and is disclosed in the privacy policy.', verdict: 'Demand a named list of partners and an opt-out mechanism. This clause is a significant privacy concern.' },
        ],
    },
};

export default function Dashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Analysis');
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [error, setError] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [showDebate, setShowDebate] = useState(false);
    const [documents, setDocuments] = useState([]);
    const [auditLogs, setAuditLogs] = useState([]);
    const [selectedPersona, setSelectedPersona] = useState('Employee');
    const fileInputRef = useRef(null);
    const [userInfo, setUserInfo] = useState({ name: 'User', email: '', picture: null, initial: 'U' });
    const [imgError, setImgError] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        setIsVisible(true);

        const token = localStorage.getItem('googleToken');
        const email = localStorage.getItem('userEmail');

        if (token) {
            fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`, {
                headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' }
            })
                .then(res => res.json())
                .then(data => {
                    if (data && data.name) {
                        setUserInfo({
                            name: data.name,
                            email: data.email,
                            picture: data.picture,
                            initial: data.name.charAt(0).toUpperCase()
                        });
                    }
                })
                .catch(err => console.log('Error fetching user info:', err));
        } else if (email) {
            setUserInfo({ name: email.split('@')[0], email: email, picture: null, initial: email.charAt(0).toUpperCase() });
        }
    }, []);

    const personaData = PERSONA_DEBATES[selectedPersona];

    const addDocument = (fileName, status = 'Analyzed') => {
        setDocuments(prev => [{
            id: Date.now(), name: fileName, status, risk: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        }, ...prev]);
        addAuditLog(`Uploaded and analyzed "${fileName}" as ${selectedPersona}`);
    };

    const addAuditLog = (action) => {
        setAuditLogs(prev => [{
            id: Date.now(), action, user: 'User',
            timestamp: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        }, ...prev]);
    };

    const handleFileUpload = async (file) => {
        if (!file) return;
        const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
        if (!validTypes.includes(file.type)) { setError('Invalid file type. Please upload PDF, DOCX, or TXT.'); return; }
        setError(null); setUploadedFile(file.name); setAnalyzing(true); setActiveTab('Analysis');
        const formData = new FormData();
        formData.append('file', file);
        formData.append('persona', selectedPersona);

        const token = localStorage.getItem('googleToken');
        const headers = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await fetch('https://lexguardx-851043397374.europe-west1.run.app/upload', {
                method: 'POST',
                body: formData,
                headers: headers
            });
            if (!response.ok) throw new Error('Upload failed');
            const data = await response.json();
            setAnalyzing(false); setResult(data); addDocument(file.name, 'Analyzed');
        } catch (err) { setError(`Project Analysis Error: Failed to reach the LexGuard X Engine. Ensure the Cloud Run service is active.`); setAnalyzing(false); }
    };

    const handleDrop = (e) => { e.preventDefault(); e.stopPropagation(); handleFileUpload(e.dataTransfer.files[0]); };
    const handleDragOver = (e) => { e.preventDefault(); e.stopPropagation(); };
    const handleLogout = () => { localStorage.clear(); navigate('/'); };

    const navItems = [
        { name: 'Documents', icon: <FileText size={20} /> },
        { name: 'Analysis', icon: <Search size={20} /> },
        { name: 'Comparison', icon: <ArrowLeftRight size={20} /> },
        { name: 'Audit Logs', icon: <Activity size={20} /> },
        { name: 'Settings', icon: <Settings size={20} /> },
    ];

    const selectTab = (tabName) => {
        setActiveTab(tabName);
        setMobileMenuOpen(false);
    };

    // ─── Persona Selector Bar ───
    const PersonaBar = () => (
        <div className="glass-panel p-2.5 mb-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {PERSONAS.map((p) => (
                    <button
                        key={p.id}
                        onClick={() => setSelectedPersona(p.id)}
                        className={`min-w-[150px] md:min-w-0 flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${selectedPersona === p.id
                            ? 'bg-[#FF9A2F]/18 text-[#FFD1A2] border border-[#FF9A2F]/45 shadow-lg shadow-[#FF9A2F]/15'
                            : 'text-[#AAB7CA] hover:text-white hover:bg-[#182234] border border-transparent'
                            }`}
                    >
                        <span className="text-lg">{p.emoji}</span>
                        <span>{p.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );

    // ─── Tab Content Renderers ───
    const renderContent = () => {
        switch (activeTab) {
            case 'Documents': return renderDocuments();
            case 'Analysis': return renderAnalysis();
            case 'Comparison': return <CompareTab />;
            case 'Audit Logs': return renderAuditLogs();
            case 'Settings': return renderSettings();
            default: return renderAnalysis();
        }
    };

    const renderDocuments = () => (
        <div className="animate-fade-in space-y-6">
            <div className="flex items-center justify-between">
                <div><h2 className="text-3xl font-bold text-white">Documents</h2><p className="text-[#9CA3AF] mt-1">All uploaded contracts and files</p></div>
                <button onClick={() => setActiveTab('Analysis')} className="btn-primary px-6 py-2.5 text-sm"><Upload size={16} /> Upload New</button>
            </div>
            {documents.length === 0 ? (
                <div className="glass-panel p-16 text-center border border-[#2a2a2a]">
                    <FileText className="mx-auto text-[#6B7280] mb-4" size={48} strokeWidth={1.5} />
                    <h3 className="text-xl font-semibold text-white mb-2">No Documents Yet</h3>
                    <p className="text-[#9CA3AF] mb-6">Upload your first contract to get started</p>
                    <button onClick={() => setActiveTab('Analysis')} className="btn-primary px-6 py-2.5 text-sm">Go to Analysis</button>
                </div>
            ) : (
                <div className="glass-panel border border-[#2a2a2a] overflow-hidden">
                    <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider border-b border-[#2a2a2a] bg-[#1a1a1a]/50">
                        <div className="col-span-5">Document</div><div className="col-span-2">Status</div><div className="col-span-2">Risk</div><div className="col-span-3">Date</div>
                    </div>
                    {documents.map(doc => (
                        <div key={doc.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-[#2a2a2a]/50 hover:bg-[#1a1a1a]/40 transition-colors cursor-pointer group">
                            <div className="col-span-5 flex items-center space-x-3"><FileText size={18} className="text-[#FF8F1C] shrink-0" /><span className="text-white font-medium truncate group-hover:text-[#FF8F1C] transition-colors">{doc.name}</span></div>
                            <div className="col-span-2"><span className="text-xs px-3 py-1 rounded-full bg-green-500/15 text-green-400 border border-green-500/30 inline-flex items-center space-x-1"><CheckCircle size={12} /><span>{doc.status}</span></span></div>
                            <div className="col-span-2"><span className={`text-sm font-semibold ${doc.risk === 'High' ? 'text-red-400' : doc.risk === 'Medium' ? 'text-yellow-400' : 'text-green-400'}`}>{doc.risk}</span></div>
                            <div className="col-span-3 flex items-center justify-between"><span className="text-sm text-[#9CA3AF]">{doc.date}</span><Eye size={16} className="text-[#6B7280] opacity-0 group-hover:opacity-100 transition-opacity" /></div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    const renderAuditLogs = () => (
        <div className="animate-fade-in space-y-6">
            <div className="flex items-center justify-between">
                <div><h2 className="text-3xl font-bold text-white">Audit Logs</h2><p className="text-[#9CA3AF] mt-1">Track all activity</p></div>
                <div className="flex items-center space-x-3"><button className="btn-secondary px-4 py-2 text-sm"><Filter size={14} /> Filter</button><button className="btn-secondary px-4 py-2 text-sm"><Download size={14} /> Export</button></div>
            </div>
            {auditLogs.length === 0 ? (
                <div className="glass-panel p-16 text-center border border-[#2a2a2a]">
                    <Activity className="mx-auto text-[#6B7280] mb-4" size={48} strokeWidth={1.5} />
                    <h3 className="text-xl font-semibold text-white mb-2">No Activity Yet</h3>
                    <p className="text-[#9CA3AF]">Activity will appear here once you start analyzing documents</p>
                </div>
            ) : (
                <div className="space-y-2">
                    {auditLogs.map(log => (
                        <div key={log.id} className="glass-panel px-6 py-4 border border-[#2a2a2a] flex items-center space-x-4 hover:border-[#3a3a3a] transition-colors">
                            <div className="w-10 h-10 rounded-full bg-[#FF8F1C]/10 flex items-center justify-center shrink-0"><Activity size={16} className="text-[#FF8F1C]" /></div>
                            <div className="flex-1 min-w-0"><p className="text-white text-sm font-medium truncate">{log.action}</p><p className="text-[#6B7280] text-xs mt-0.5">by {log.user}</p></div>
                            <div className="flex items-center space-x-2 text-[#9CA3AF] text-xs shrink-0"><Clock size={14} /><span>{log.timestamp}</span></div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    const renderSettings = () => (
        <div className="animate-fade-in space-y-6">
            <div><h2 className="text-3xl font-bold text-white">Settings</h2><p className="text-[#9CA3AF] mt-1">Configure your preferences</p></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { title: 'Default Persona', desc: 'Set the default analysis perspective', value: selectedPersona },
                    { title: 'Risk Threshold', desc: 'Minimum risk level to flag', value: 'Medium' },
                    { title: 'Auto-Export', desc: 'Automatically export reports', value: 'Disabled' },
                    { title: 'Dark Mode', desc: 'Interface theme', value: 'Always On' },
                ].map((s, i) => (
                    <div key={i} className="glass-panel p-6 border border-[#2a2a2a]">
                        <div className="flex items-center justify-between">
                            <div><h4 className="text-white font-semibold">{s.title}</h4><p className="text-[#9CA3AF] text-sm mt-1">{s.desc}</p></div>
                            <span className="text-[#FF8F1C] text-sm font-medium bg-[#FF8F1C]/10 px-3 py-1 rounded-lg">{s.value}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // ─── Analysis Tab (with Persona Bar) ───
    const renderAnalysis = () => (
        <>
            {/* Persona Bar — always visible in Analysis */}
            <PersonaBar />

            {!result && !analyzing && (
                <div className={`flex flex-col items-center justify-center space-y-10 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ minHeight: 'calc(100% - 80px)' }}>
                    <div className="text-center space-y-4 max-w-3xl">
                        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent leading-tight">
                            Analyze as {PERSONAS.find(p => p.id === selectedPersona)?.emoji} {selectedPersona}
                        </h2>
                        <p className="text-lg text-[#9CA3AF]">
                            {PERSONAS.find(p => p.id === selectedPersona)?.desc} — upload a contract to start
                        </p>
                    </div>
                    <input ref={fileInputRef} id="file-upload" type="file" accept=".pdf,.docx,.txt" onChange={(e) => handleFileUpload(e.target.files[0])} className="hidden" aria-hidden="true" />
                    <div role="button" tabIndex={0} aria-label="Upload Document Drag and Drop Zone" onClick={() => fileInputRef.current?.click()} onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()} onDrop={handleDrop} onDragOver={handleDragOver}
                        className="w-full max-w-2xl border-2 border-dashed border-[#FF8F1C]/40 rounded-2xl p-14 hover:border-[#FF8F1C] transition-all duration-300 cursor-pointer glass-panel hover:bg-[#FF8F1C]/5 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#FF8F1C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10 text-center">
                            <Upload className="mx-auto text-[#FF8F1C] mb-5 group-hover:scale-110 transition-transform duration-300" size={56} strokeWidth={1.5} />
                            <div className="font-bold text-xl mb-2 text-white">Click to upload or drag and drop</div>
                            <div className="text-sm text-[#9CA3AF]">PDF, DOCX, TXT files up to 10MB</div>
                        </div>
                    </div>
                    {error && (
                        <div className="w-full max-w-2xl bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm flex items-center justify-between">
                            <div className="flex items-center space-x-3"><AlertTriangle size={18} /><span>{error}</span></div>
                            <X size={18} className="cursor-pointer hover:text-red-300" onClick={() => setError(null)} />
                        </div>
                    )}
                </div>
            )}

            {analyzing && (
                <div className="flex flex-col items-center justify-center space-y-8 animate-fade-in" style={{ minHeight: 'calc(100% - 80px)' }}>
                    <div className="relative">
                        <div className="w-24 h-24 border-4 border-[#FF8F1C]/20 border-t-[#FF8F1C] rounded-full animate-spin"></div>
                        <div className="absolute inset-0 w-24 h-24 border-4 border-transparent border-b-[#FF8F1C]/40 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                    </div>
                    <div className="text-center space-y-3">
                        <p className="text-3xl font-bold text-white">Analyzing as {selectedPersona}</p>
                        <p className="text-[#9CA3AF] animate-pulse text-lg">Running 7 AI Agents...</p>
                    </div>
                </div>
            )}

            {result && (
                <div className="space-y-6 animate-fade-in">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="space-y-3">
                            <h1 className="text-3xl font-bold text-white">Analysis Results</h1>
                            <p className="text-[#9CA3AF]"><span className="text-[#6B7280]">File:</span> <span className="font-medium text-white">{uploadedFile || 'Document'}</span></p>
                            <div className="flex flex-wrap gap-2">
                                <span className="inline-flex items-center space-x-1.5 text-xs bg-red-500/15 text-red-400 px-3 py-1.5 rounded-lg border border-red-500/30 font-semibold"><AlertOctagon size={14} /><span>Critical Risk</span></span>
                                <span className="inline-flex items-center space-x-1.5 text-xs bg-blue-500/15 text-blue-400 px-3 py-1.5 rounded-lg border border-blue-500/30 font-semibold"><CheckCircle size={14} /><span>Complete</span></span>
                            </div>
                        </div>
                        <button onClick={() => { setResult(null); setUploadedFile(null); }} className="btn-primary px-6 py-2.5 whitespace-nowrap text-sm">New Analysis</button>
                    </div>

                    {/* Score Cards — driven by persona */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: 'Overall Risk', value: personaData.scores.overall, color: 'text-red-400', icon: TrendingUp },
                            { label: 'Compliance', value: personaData.scores.compliance, color: 'text-orange-400', icon: CheckCircle },
                            { label: 'Financial', value: personaData.scores.financial, color: 'text-yellow-400', icon: TrendingUp },
                            { label: 'Liabilities', value: personaData.scores.liabilities, color: 'text-red-400', icon: AlertTriangle },
                        ].map((s, i) => (
                            <div key={i} className="glass-panel p-5 border border-[#2a2a2a]">
                                <div className="flex items-center justify-between mb-2"><span className="text-xs text-[#9CA3AF] font-medium">{s.label}</span><s.icon size={16} className={s.color} /></div>
                                <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
                            </div>
                        ))}
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Document Analysis — driven by persona findings */}
                        <div className="lg:col-span-2 glass-panel p-6 border border-[#2a2a2a]">
                            <h3 className="font-bold text-lg mb-5 flex items-center justify-between border-b border-[#2a2a2a] pb-4">
                                <span className="text-white">Key Findings — {selectedPersona} View</span>
                                <button className="text-xs btn-secondary px-3 py-1.5">Highlight Risks</button>
                            </h3>
                            <div className="space-y-4">
                                {personaData.findings.map((finding, i) => (
                                    <div key={i} className={`p-4 rounded-xl border-l-4 ${i === 0 ? 'border-red-500 bg-red-500/5' : i === 1 ? 'border-orange-500 bg-orange-500/5' : 'border-yellow-500 bg-yellow-500/5'}`}>
                                        <p className="text-white text-sm">{i + 1}. {finding}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* AI Debate — driven by persona */}
                        <div className="glass-panel p-6 border border-cyan-400/25 flex flex-col bg-gradient-to-br from-cyan-400/8 to-transparent">
                            <h3 className="font-bold text-lg mb-5 text-cyan-300 flex items-center space-x-2 border-b border-cyan-400/20 pb-4">
                                <Brain size={20} /><span>AI Debate</span>
                            </h3>
                            <div className="space-y-3 flex-1 text-sm">
                                {personaData.debate.map((d, i) => (
                                    <div key={i} className={`bg-${d.color}-500/10 border border-${d.color}-500/30 rounded-xl p-4`}
                                        style={{ background: d.color === 'red' ? 'rgba(239,68,68,0.08)' : 'rgba(34,197,94,0.08)', borderColor: d.color === 'red' ? 'rgba(239,68,68,0.25)' : 'rgba(34,197,94,0.25)' }}>
                                        <strong className={`${d.color === 'red' ? 'text-red-400' : 'text-green-400'} flex items-center space-x-2 text-sm`}>
                                            <span>{d.color === 'red' ? '🔴' : '🟢'}</span><span>Agent {d.color === 'red' ? '2 (Prosecutor)' : '3 (Defense)'}</span>
                                        </strong>
                                        <p className="text-[#d4d4d4] mt-2 leading-relaxed text-xs">{d.text}</p>
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => setShowDebate(true)} className="btn-secondary w-full mt-5 py-2.5 text-sm font-semibold">
                                View Full Debate
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );

    // ─── Full Debate Modal ───
    const renderDebateModal = () => (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowDebate(false)}>
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
            <div className="relative bg-[#101927] border border-[#2a3950] rounded-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden animate-fade-in-scale" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between px-8 py-5 border-b border-[#2a3950]">
                    <div className="flex items-center space-x-3">
                        <Brain size={24} className="text-cyan-300" />
                        <div>
                            <h2 className="text-xl font-bold text-white">Full AI Debate — {selectedPersona} Perspective</h2>
                            <p className="text-xs text-[#AAB7CA] mt-0.5">{personaData.rounds.length} debate rounds analyzed</p>
                        </div>
                    </div>
                    <button onClick={() => setShowDebate(false)} className="text-[#AAB7CA] hover:text-white p-2 hover:bg-[#172437] rounded-lg transition-colors"><X size={20} /></button>
                </div>
                <div className="overflow-y-auto max-h-[calc(85vh-76px)] p-8 space-y-8">
                    {personaData.rounds.map((round, i) => (
                        <div key={i} className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <span className={`text-xs font-bold px-3 py-1 rounded-full ${round.severity === 'critical' ? 'bg-red-500/20 text-red-400' : round.severity === 'high' ? 'bg-orange-500/20 text-orange-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{round.severity.toUpperCase()}</span>
                                <h3 className="text-lg font-bold text-white">Round {i + 1}: {round.topic}</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="rounded-xl p-5" style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)' }}>
                                    <strong className="text-red-400 text-sm flex items-center space-x-2 mb-3"><span>🔴</span><span>Prosecutor</span></strong>
                                    <p className="text-[#d4d4d4] text-sm leading-relaxed">{round.prosecutor}</p>
                                </div>
                                <div className="rounded-xl p-5" style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.2)' }}>
                                    <strong className="text-green-400 text-sm flex items-center space-x-2 mb-3"><span>🟢</span><span>Defense</span></strong>
                                    <p className="text-[#d4d4d4] text-sm leading-relaxed">{round.defense}</p>
                                </div>
                            </div>
                            <div className="rounded-xl p-5" style={{ background: 'rgba(88,217,208,0.07)', border: '1px solid rgba(88,217,208,0.3)' }}>
                                <strong className="text-cyan-300 text-sm flex items-center space-x-2 mb-3"><span>⚖️</span><span>Judge Verdict</span></strong>
                                <p className="text-white text-sm leading-relaxed">{round.verdict}</p>
                            </div>
                            {i < personaData.rounds.length - 1 && <div className="border-t border-[#2a3950]"></div>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="relative flex h-screen overflow-hidden bg-[#070b12] text-white">
            <div className="pointer-events-none absolute -top-32 right-12 h-72 w-72 rounded-full bg-[#FF9A2F]/15 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

            {/* Desktop Sidebar */}
            <aside className={`${sidebarOpen ? 'w-72' : 'w-20'} hidden md:flex bg-[#101927]/90 border-r border-[#2a3950] flex-col transition-all duration-300 z-10`}>
                <div className="p-6 flex items-center justify-between border-b border-[#2a3950]">
                    {sidebarOpen && <div className="flex items-center space-x-2.5 cursor-pointer"><Shield className="text-[#FF9A2F]" size={28} /><span className="text-xl font-bold">LexGuard<span className="text-[#AAB7CA] font-light">X</span></span></div>}
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle Sidebar Navigation" aria-expanded={sidebarOpen} className="text-[#AAB7CA] hover:text-white p-2 hover:bg-[#172437] rounded-lg transition-colors"><Menu size={20} aria-hidden="true" /></button>
                </div>
                <div className={`px-4 py-3 text-xs text-[#7A869B] font-semibold tracking-wider mt-6 ${!sidebarOpen && 'hidden'}`}>NAVIGATION</div>
                <nav className="flex-1 px-3 space-y-1.5 mt-2" aria-label="Main Navigation">
                    {navItems.map(item => (
                        <div key={item.name} onClick={() => selectTab(item.name)}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${item.name === activeTab ? 'bg-[#FF9A2F]/18 text-[#FFD1A2] border border-[#FF9A2F]/35' : 'text-[#AAB7CA] hover:text-white hover:bg-[#172437] border border-transparent'}`} title={item.name}>
                            {item.icon}
                            {sidebarOpen && <span className="font-semibold text-sm">{item.name}</span>}
                        </div>
                    ))}
                </nav>
                <div className="border-t border-[#2a3950] p-3">
                    <button onClick={handleLogout} aria-label="Log Out of LexGuard X" className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-[#AAB7CA] hover:text-red-300 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20" title="Logout">
                        <LogOut size={20} aria-hidden="true" />{sidebarOpen && <span className="font-semibold text-sm">Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Mobile Drawer */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)}>
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
                    <aside className="absolute left-0 top-0 h-full w-72 bg-[#101927] border-r border-[#2a3950] p-4" onClick={(e) => e.stopPropagation()}>
                        <div className="mb-5 flex items-center justify-between">
                            <div className="flex items-center space-x-2.5"><Shield className="text-[#FF9A2F]" size={26} /><span className="text-lg font-bold">LexGuard<span className="text-[#AAB7CA] font-light">X</span></span></div>
                            <button onClick={() => setMobileMenuOpen(false)} className="text-[#AAB7CA] hover:text-white"><X size={20} /></button>
                        </div>
                        <nav className="space-y-1.5">
                            {navItems.map(item => (
                                <button key={item.name} type="button" onClick={() => selectTab(item.name)}
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${item.name === activeTab ? 'bg-[#FF9A2F]/18 text-[#FFD1A2] border border-[#FF9A2F]/35' : 'text-[#AAB7CA] hover:text-white hover:bg-[#172437] border border-transparent'}`}>
                                    {item.icon}
                                    <span className="font-semibold text-sm">{item.name}</span>
                                </button>
                            ))}
                        </nav>
                        <button onClick={handleLogout} className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-[#AAB7CA] hover:text-red-300 hover:bg-red-500/10 border border-[#2a3950]">
                            <LogOut size={18} />
                            <span className="font-semibold text-sm">Logout</span>
                        </button>
                    </aside>
                </div>
            )}

            {/* Main */}
            <div className="relative z-10 flex-1 flex flex-col overflow-hidden">
                <header className="h-20 bg-[#101927]/80 backdrop-blur-xl border-b border-[#2a3950] flex items-center justify-between px-4 md:px-8">
                    <div className="flex items-center gap-3 flex-1 max-w-2xl">
                        <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-[#AAB7CA] hover:text-white p-2 rounded-lg hover:bg-[#172437]" aria-label="Open navigation menu">
                            <Menu size={20} />
                        </button>
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A869B]" size={18} aria-hidden="true" />
                            <input type="text" placeholder="Search documents, findings, clauses..." aria-label="Search through documents and features" className="w-full bg-[#0D1421] border border-[#2a3950] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white outline-none focus:border-[#FF9A2F] transition-colors" />
                        </div>
                    </div>
                    <div className="flex items-center space-x-4 ml-4">
                        <div className="text-right text-sm hidden md:block">
                            <div className="font-semibold text-white">{userInfo.name}</div>
                            <div className="text-xs text-[#7A869B]">{userInfo.email || 'Legal Professional'}</div>
                        </div>
                        {userInfo.picture && !imgError ? (
                            <img
                                src={userInfo.picture}
                                alt={userInfo.name}
                                referrerPolicy="no-referrer"
                                onError={() => setImgError(true)}
                                className="w-10 h-10 rounded-xl object-cover border border-[#2a3950]"
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF9A2F] to-[#FF7A00] flex items-center justify-center font-bold text-white">
                                {userInfo.initial}
                            </div>
                        )}
                    </div>
                </header>
                <main className="flex-1 overflow-auto px-4 py-5 md:p-8 bg-transparent">
                    <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="glass-panel p-4 border border-[#2a3950]"><p className="text-xs uppercase tracking-wider text-[#7A869B] mb-1">Persona Mode</p><p className="text-lg font-bold text-[#FFD1A2]">{selectedPersona}</p></div>
                        <div className="glass-panel p-4 border border-[#2a3950]"><p className="text-xs uppercase tracking-wider text-[#7A869B] mb-1">Documents Analyzed</p><p className="text-lg font-bold text-white">{documents.length}</p></div>
                        <div className="glass-panel p-4 border border-[#2a3950]"><p className="text-xs uppercase tracking-wider text-[#7A869B] mb-1">Audit Entries</p><p className="text-lg font-bold text-cyan-300">{auditLogs.length}</p></div>
                    </div>
                    {renderContent()}
                </main>
            </div>

            {showDebate && renderDebateModal()}
        </div>
    );
}
