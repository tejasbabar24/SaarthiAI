import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Globe, Sparkles, Search, CheckCircle, FileWarning, ClipboardList, MapPin, GraduationCap, ArrowRight, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getResponse, sampleQueries, chatResponses } from '../data/chatResponses';
import { InlineLoader } from '../components/ui/LoadingState';
import { useApp } from '../context/AppContext';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'mr', label: 'मराठी' },
  { code: 'hi', label: 'हिन्दी' },
];

function SchemeChip({ schemeId, name, match }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(`/schemes/${schemeId}`)}
      className="flex items-center justify-between bg-white border border-border rounded-lg p-2.5 hover:border-blue-brand hover:shadow-sm transition-all text-left"
    >
      <div>
        <p className="text-xs font-semibold text-navy leading-tight">{name}</p>
        <span className="text-xs text-green-700 font-medium">{match}% match</span>
      </div>
      <ArrowRight className="w-3.5 h-3.5 text-text-muted" />
    </button>
  );
}

function EligibilityCheck({ checks, suggestion }) {
  return (
    <div className="space-y-2">
      {checks.map((c, i) => (
        <div key={i} className={`flex items-center gap-2 text-xs px-2.5 py-1.5 rounded-lg ${c.passed ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-700'}`}>
          {c.passed ? <CheckCircle className="w-3.5 h-3.5 shrink-0" /> : <FileWarning className="w-3.5 h-3.5 shrink-0" />}
          <span>{c.label}: {c.value}</span>
        </div>
      ))}
      {suggestion && (
        <p className="text-xs text-text-muted mt-2 italic">{suggestion}</p>
      )}
    </div>
  );
}

function LocationList({ locations }) {
  return (
    <div className="space-y-2">
      {locations.map((loc, i) => (
        <div key={i} className="flex items-center gap-2.5 bg-white border border-border rounded-lg px-3 py-2">
          <MapPin className="w-4 h-4 text-navy shrink-0" />
          <div>
            <p className="text-xs font-semibold text-navy">{loc.name}</p>
            <p className="text-xs text-text-muted">{loc.type} · {loc.distance}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function DocList({ verified, missing, suggestion }) {
  return (
    <div className="space-y-2">
      {verified.map(d => (
        <div key={d} className="flex items-center gap-2 text-xs bg-green-50 text-green-800 rounded-lg px-2.5 py-1.5">
          <CheckCircle className="w-3.5 h-3.5 shrink-0" /> {d}
        </div>
      ))}
      {missing.map(d => (
        <div key={d} className="flex items-center gap-2 text-xs bg-orange/10 text-orange rounded-lg px-2.5 py-1.5">
          <FileWarning className="w-3.5 h-3.5 shrink-0" /> ⚠ {d} – Missing
        </div>
      ))}
      {suggestion && <p className="text-xs text-text-muted italic mt-1">{suggestion}</p>}
    </div>
  );
}

function StepsList({ steps, note }) {
  return (
    <div className="space-y-2">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-2.5">
          <span className="w-5 h-5 rounded-full bg-navy text-white text-xs flex items-center justify-center shrink-0 font-bold">{i + 1}</span>
          <p className="text-sm text-text-dark leading-snug">{step}</p>
        </div>
      ))}
      {note && <p className="text-xs text-blue-brand mt-2">💡 {note}</p>}
    </div>
  );
}

function AssistantMessage({ msg }) {
  return (
    <div className="flex gap-2.5 max-w-[90%]">
      <div className="w-7 h-7 bg-navy rounded-full flex items-center justify-center shrink-0">
        <Sparkles className="w-3.5 h-3.5 text-orange" />
      </div>
      <div className="space-y-2 flex-1">
        <div className="bg-white border border-border rounded-2xl rounded-tl-sm px-3.5 py-3">
          <p className="text-sm text-text-dark whitespace-pre-line">{msg.message}</p>
        </div>
        {msg.type === 'schemes' && msg.schemes && (
          <div className="grid grid-cols-2 gap-2">
            {msg.schemes.map(s => <SchemeChip key={s.id} {...s} schemeId={s.id} />)}
          </div>
        )}
        {msg.type === 'eligibility' && msg.checks && (
          <div className="bg-white border border-border rounded-xl p-3">
            <EligibilityCheck checks={msg.checks} suggestion={msg.suggestion} />
          </div>
        )}
        {msg.type === 'documents' && (
          <div className="bg-white border border-border rounded-xl p-3">
            <DocList verified={msg.verified || []} missing={msg.missing || []} suggestion={msg.suggestion} />
          </div>
        )}
        {msg.type === 'steps' && msg.steps && (
          <div className="bg-white border border-border rounded-xl p-3">
            <StepsList steps={msg.steps} note={msg.note} />
          </div>
        )}
        {msg.type === 'locations' && msg.locations && (
          <div className="bg-white border border-border rounded-xl p-3">
            <LocationList locations={msg.locations} />
          </div>
        )}
      </div>
    </div>
  );
}

const sampleIcons = {
  search: Search,
  'check-circle': CheckCircle,
  'file-warning': FileWarning,
  'clipboard-list': ClipboardList,
  'map-pin': MapPin,
  'graduation-cap': GraduationCap,
};

export default function AIAssistant() {
  const { citizen } = useApp();
  const [messages, setMessages] = useState([
    { role: 'assistant', ...chatResponses.greet },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('en');
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = (text) => {
    if (!text.trim() || loading) return;
    setMessages(prev => [...prev, { role: 'user', text }]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const resp = getResponse(text);
      setMessages(prev => [...prev, { role: 'assistant', ...resp }]);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 64px)' }}>
      {/* Header */}
      <div className="bg-white border-b border-border px-5 py-3 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-base font-bold text-navy flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-orange" />
            Sarthi AI Assistant
          </h1>
          <p className="text-xs text-text-muted">Ask about schemes, eligibility, documents and applications.</p>
        </div>
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-text-muted" />
          <div className="flex border border-border rounded-lg overflow-hidden">
            {languages.map(lang => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`px-2.5 py-1.5 text-xs font-medium transition-colors ${language === lang.code ? 'bg-navy text-white' : 'text-text-muted hover:bg-bg'}`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-bg chat-scroll">
        {/* Citizen profile badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 bg-white border border-border rounded-full px-3 py-1.5 text-xs text-text-muted shadow-card">
            <User className="w-3.5 h-3.5" />
            Chatting as: <strong className="text-navy">{citizen.name}</strong>
            <span className="bg-navy/10 text-navy px-1.5 py-0.5 rounded-full font-medium">{citizen.category}</span>
          </div>
        </div>

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'user' ? (
              <div className="bg-navy text-white text-sm px-4 py-3 rounded-2xl rounded-tr-sm max-w-[70%] leading-relaxed">
                {msg.text}
              </div>
            ) : (
              <AssistantMessage msg={msg} />
            )}
          </div>
        ))}

        {loading && (
          <div className="flex justify-start gap-2.5">
            <div className="w-7 h-7 bg-navy rounded-full flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-orange" />
            </div>
            <div className="bg-white border border-border rounded-2xl rounded-tl-sm px-3.5 py-3">
              <InlineLoader />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Sample queries */}
      <div className="bg-white border-t border-border px-4 py-3 overflow-x-auto">
        <div className="flex gap-2 whitespace-nowrap">
          {sampleQueries.map((q, i) => {
            const Icon = sampleIcons[q.icon] || Search;
            return (
              <button
                key={i}
                onClick={() => sendMessage(q.query)}
                className="inline-flex items-center gap-1.5 text-xs font-medium bg-bg border border-border text-text-dark hover:border-blue-brand hover:text-blue-brand px-3 py-1.5 rounded-full transition-all shrink-0"
              >
                <Icon className="w-3 h-3" />
                {q.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-border px-4 py-3 shrink-0">
        <div className="flex items-center gap-2 max-w-4xl mx-auto">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
            placeholder={
              language === 'mr' ? 'योजना, पात्रता विषयी विचारा...' :
              language === 'hi' ? 'योजनाएं, पात्रता के बारे में पूछें...' :
              'Ask about schemes, eligibility, documents...'
            }
            className="flex-1 input-field py-3"
          />
          <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-bg transition-colors text-text-muted border border-border">
            <Mic className="w-4 h-4" />
          </button>
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            className="w-10 h-10 rounded-lg bg-blue-brand flex items-center justify-center hover:bg-blue-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
