import React from "react";
import {
  CaseUpper,
  CaseLower,
  Type,
  ArrowLeftRight,
} from "lucide-react";

function Sidebar({ onAction }) {

  const buttonStyle =
    "w-full flex items-center gap-5 p-5 mb-4 rounded-xl border border-purple-200 hover:bg-purple-100 transition font-semibold text-lg text-left";

  return (
    <aside className="w-[365px] shrink-0 min-h-[690px] bg-white rounded-[20px] shadow-lg p-[18px]">

      {/* Heading */}
      <h3 className="text-lg font-bold text-gray-700 mb-5">
        TEXT TOOLS
      </h3>

      {/* Uppercase */}
      <button
        type="button"
        onClick={() => onAction("uppercase")}
        className={`${buttonStyle} bg-purple-100 border-transparent`}
      >
        <CaseUpper size={28} className="shrink-0" />
        UPPERCASE
      </button>

      {/* Lowercase */}
      <button
        type="button"
        onClick={() => onAction("lowercase")}
        className={buttonStyle}
      >
        <CaseLower size={28} className="shrink-0" />
        lowercase
      </button>

      {/* Capital Case */}
      <button
        type="button"
        onClick={() => onAction("capital")}
        className={buttonStyle}
      >
        <Type size={28} className="shrink-0" />
        Capital Case
      </button>

      {/* Sentence Case */}
      <button
        type="button"
        onClick={() => onAction("sentence")}
        className={buttonStyle}
      >
        <Type size={28} className="shrink-0" />
        Sentence Case
      </button>

      {/* Divider */}
      <hr className="border-purple-200 my-5" />

      {/* English to Hindi */}
      <button
        type="button"
        onClick={() => onAction("en-hi")}
        className={buttonStyle}
      >
        <ArrowLeftRight
          size={28}
          className="text-purple-800 shrink-0"
        />
        <span>
          Translate<br />
          English to Hindi
        </span>
      </button>

      {/* Hindi to English */}
      <button
        type="button"
        onClick={() => onAction("hi-en")}
        className={buttonStyle.replace("mb-4", "mb-0")}
      >
        <ArrowLeftRight
          size={28}
          className="text-purple-800 shrink-0"
        />
        <span>
          Translate<br />
          Hindi to English
        </span>
      </button>

    </aside>
  );
}

export default Sidebar;