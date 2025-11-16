import React from "react";
import { useFocusTrap } from "../../hooks/useFocusTrap";

export default function AvatarEditModal({ value, onChange, onSave, onCancel }) {
  const trapRef = useFocusTrap(true);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="avatar-modal-title"
    >
      <div
        ref={trapRef}
        className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
      >
        <h3
          id="avatar-modal-title"
          className="text-2xl font-bold text-gray-900 mb-4"
        >
          Change Your Avatar
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-4">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-mint-400"
              placeholder="Enter emoji"
              maxLength={2}
              aria-label="Avatar emoji input"
              autoFocus
            />
            <div className="text-6xl">{value || "🧒"}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Popular Avatars:
            </p>
            <div className="grid grid-cols-8 gap-2">
              {[
                "🧒",
                "👦",
                "👧",
                "🧑",
                "👶",
                "🧑‍🦱",
                "👩‍🦰",
                "🧔",
                "😀",
                "😎",
                "🤓",
                "🥳",
                "🦸",
                "🦄",
                "🐶",
                "🐱",
              ].map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => onChange(emoji)}
                  className="text-3xl hover:bg-gray-200 rounded-lg p-2 transition"
                  aria-label={`Select ${emoji} as avatar`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={onSave}
            className="flex-1 px-4 py-3 bg-mint-400 text-gray-900 font-bold rounded-lg hover:bg-mint-300 transition text-lg"
          >
            Save Avatar
          </button>
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
