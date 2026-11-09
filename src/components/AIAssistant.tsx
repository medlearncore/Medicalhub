/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { usePlatform } from '../PlatformContext';
import {
  Sparkles,
  Send,
  Bot,
  Brain,
  FileText,
  HelpCircle,
  Layers,
  ArrowRight
} from 'lucide-react';

export const AIAssistant: React.FC = () => {
  const { lang, subjects } = usePlatform();
  const [selectedSubject, setSelectedSubject] = useState(subjects[0].id);
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string; source?: string }>>([
    {
      sender: 'assistant',
      text: 'مرحباً دكتور! أنا المساعد الطبي الذكي لمنصة MedStudy Hub. يمكنني مساعدتك في شرح آليات الأمراض، المقارنة بين المتلازمات، وتوليد أسئلة سريرية وبطاقات استرجاع بالاعتماد على مراجع المنصة.',
      source: 'MedStudy Hub Academic Library Verified Corpus'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userText = prompt;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setPrompt('');
    setIsLoading(true);

    setTimeout(() => {
      let reply = `بناءً على مراجع مادة ${selectedSubject.toUpperCase()}: \n\nتعتبر هذه الحالة من الحالات عالية الأهمية السريرية (High-Yield). الخطوة التشخيصية الأولى تعتمد على تقييم العلامات الحيوية، يليها الفحص المخبري وتحديد التشخيص التفريقي بدقة.`;
      
      if (userText.toLowerCase().includes('stenosis') || userText.toLowerCase().includes('heart')) {
        reply = `في تضيق الصمام الأبهري (Aortic Stenosis)، يزداد الضغط الانقباضي للبطين الأيسر بشكل ملحوظ للتغلب على الانسداد، مما يؤدي إلى تضخم متراكز (Concentric Hypertrophy) وتأخر في نبض الشريان السباتي (Pulsus parvus et tardus).`;
      }

      setMessages(prev => [
        ...prev,
        {
          sender: 'assistant',
          text: reply,
          source: 'Robbins & Cotran Pathologic Basis of Disease, 10th Ed'
        }
      ]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1D4ED8] to-[#06B6D4] flex items-center justify-center text-white">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {lang === 'ar' ? 'المساعد الطبي للدراسة والتحليل' : 'AI Medical Study Assistant'}
            </h2>
            <p className="text-xs text-slate-500">
              Context-grounded medical analysis, differential diagnosis & active recall synthesis
            </p>
          </div>
        </div>

        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="p-2 rounded-xl border border-slate-200 text-xs bg-white text-slate-700 font-semibold"
        >
          {subjects.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>

      {/* Messages Scroll Box */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm min-h-[420px] max-h-[500px] overflow-y-auto space-y-4">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.sender === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
            )}
            <div
              className={`p-4 rounded-2xl max-w-xl text-xs sm:text-sm leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-slate-50 text-slate-800 border border-slate-100 rounded-tl-none space-y-2'
              }`}
            >
              <p className="whitespace-pre-line">{m.text}</p>
              {m.source && (
                <div className="pt-2 border-t border-slate-200/60 text-[10px] text-slate-500 italic">
                  📚 المرجع الأكاديمي: {m.source}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="animate-spin">⏳</span>
            <span>جاري تحليل الحالة الطبية والبحث في المراجع...</span>
          </div>
        )}
      </div>

      {/* Input Field */}
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={lang === 'ar' ? 'اسأل عن أي مادة، مرض، أو قارن بين آليتين دوائيتين...' : 'Ask about clinical signs, pharmacologic mechanisms, or high-yield comparisons...'}
          className="flex-1 p-3.5 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:border-blue-500 shadow-xs"
        />
        <button
          type="submit"
          className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-semibold shadow-md flex items-center gap-1.5 transition"
        >
          <Send className="w-4 h-4 rtl:rotate-180" />
          <span>إرسال</span>
        </button>
      </form>
    </div>
  );
};
