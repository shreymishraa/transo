import React from "react";
import {
  CaseUpper,
  CaseLower,
  Type,
  Languages,
  ArrowLeftRight,
} from "lucide-react";

function Sidebar({ onAction }) {

  return (
       <aside className="w-[365px] shrink-0 min-h-[690px] bg-white rounded-[20px] shadow-lg p-[18px]">

      {/* Heading */}
      <h3 className="text-lg font-bold text-gray-700 mb-5">
        TEXT TOOLS
      </h3>

      {/* Uppercase */}
      <button
        onClick={() => onAction("uppercase")}
        className="w-full flex items-center gap-5 p-5 mb-4 rounded-xl bg-purple-100 hover:bg-purple-200 transition font-semibold text-lg"
      >
        <CaseUpper size={28} />
        UPPERCASE
      </button>

      {/* Lowercase */}
      <button
        onClick={() => onAction("lowercase")}
        className="w-full flex items-center gap-5 p-5 mb-4 rounded-xl border border-purple-200 hover:bg-purple-100 transition font-semibold text-lg"
      >
        <CaseLower size={28} />
        lowercase
      </button>

      {/* Capital Case */}
      <button
        onClick={() => onAction("capital")}
        className="w-full flex items-center gap-5 p-5 mb-4 rounded-xl border border-purple-200 hover:bg-purple-100 transition font-semibold text-lg"
      >
        <Type size={28} />
        Capital Case
      </button>

      {/* Sentence Case */}
      <button
        onClick={() => onAction("sentence")}
        className="w-full flex items-center gap-5 p-5 mb-5 rounded-xl border border-purple-200 hover:bg-purple-100 transition font-semibold text-lg"
      >
        <Type size={28} />
        Sentence Case
      </button>

      {/* Divider */}
      <hr className="border-purple-200 my-5" />

      {/* English to Hindi */}
      <button
        onClick={() => onAction("en-hi")}
        className="w-full flex items-center gap-5 p-5 mb-4 rounded-xl border border-purple-200 hover:bg-purple-100 transition font-semibold text-lg text-left"
      >
        <ArrowLeftRight size={28} className="text-purple-800 shrink-0" />
        <span>
          Translate<br />
          English to Hindi
        </span>
      </button>

      {/* Hindi to English */}
      <button
        onClick={() => onAction("hi-en")}
        className="w-full flex items-center gap-5 p-5 rounded-xl border border-purple-200 hover:bg-purple-100 transition font-semibold text-lg text-left"
      >
        <ArrowLeftRight size={28} className="text-purple-800 shrink-0" />
        <span>
          Translate<br />
          Hindi to English
        </span>
      </button>

    </aside>
  );
}

export default Sidebar;