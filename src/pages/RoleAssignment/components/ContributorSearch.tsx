import React, { useState, useRef, useEffect } from 'react';

import { Contributor, ContributorRole } from '@/types';

import { CreateContributorModal } from './CreateContributorModal';

interface ContributorSearchProps {
  label: string;
  contributors: Contributor[];
  selectedContributors: Contributor[];
  onSelect: (contributors: Contributor[]) => void;
  allowMultiple?: boolean;
  required?: boolean;
  onCreateContributor: (newContributor: Omit<Contributor, 'contributorId'>) => Contributor;
  role: ContributorRole;
}

export const ContributorSearch: React.FC<ContributorSearchProps> = ({
  label,
  contributors,
  selectedContributors,
  onSelect,
  allowMultiple = false,
  required = false,
  onCreateContributor,
  role,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredContributors = contributors.filter(
    (contributor) =>
      (contributor.contributorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contributor.contributorAlias.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contributor.contributorId.toString().includes(searchQuery)) &&
      !selectedContributors.some((c) => c.contributorId === contributor.contributorId)
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (contributor: Contributor) => {
    if (allowMultiple) {
      onSelect([...selectedContributors, contributor]);
    } else {
      onSelect([contributor]);
    }
    setSearchQuery('');
    setIsDropdownVisible(false);
  };

  const handleRemove = (contributorId: number) => {
    onSelect(selectedContributors.filter((c) => c.contributorId !== contributorId));
  };

  const handleInputFocus = () => {
    setIsDropdownVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsDropdownVisible(true);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-400 mb-4">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex flex-wrap gap-2">
        {selectedContributors.length === 0 && (
          <span className="text-[#4d4d4d] text-xs">No {label.toLowerCase()} selected</span>
        )}
        {selectedContributors.map((contributor) => (
          <div
            key={contributor.contributorId}
            className="inline-flex items-center justify-between bg-[#1A1A1A] rounded-lg px-1 py-2"
          >
            <div className="flex items-center gap-3">
              <img src={contributor.contributorAvatarUrl} alt="" className="h-8 w-8 rounded-full" />
              <div className="flex flex-col">
                <span className="text-gray-200 text-sm">
                  {contributor.contributorName} (ID:{contributor.contributorId})
                </span>
                <span className="text-gray-500 text-xs">Alias: {contributor.contributorAlias}</span>
              </div>
            </div>
            <button
              onClick={() => handleRemove(contributor.contributorId)}
              className="ml-1 text-gray-400 hover:text-gray-200 p-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          ref={inputRef}
          type="text"
          className="w-full rounded-md text-sm bg-[#09090B] border-[#6b728047] border text-gray-200 pl-10 pr-4 py-3 placeholder-gray-500 outline-none"
          placeholder="Typing name or id of artist here..."
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        {isDropdownVisible && (
          <div
            ref={dropdownRef}
            className="absolute z-10 mt-1 w-full rounded-md bg-[#161617] shadow-lg max-h-60 overflow-auto border border-[#6b728047]"
          >
            {filteredContributors.length > 0 ? (
              <>
                {filteredContributors.map((contributor) => (
                  <div
                    key={contributor.contributorId}
                    className="flex cursor-pointer items-center px-4 py-2 hover:bg-gray-800"
                    onClick={() => handleSelect(contributor)}
                  >
                    <img
                      src={contributor.contributorAvatarUrl}
                      alt=""
                      className="h-8 w-8 rounded-full mr-3"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-200">
                        {contributor.contributorName}
                      </div>
                      <div className="text-xs text-gray-400">
                        {contributor.contributorAlias} (ID: {contributor.contributorId})
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <button
                className="w-full text-left px-4 py-2 text-blue-400 hover:bg-gray-800 text-sm"
                onClick={() => {
                  setIsModalOpen(true);
                  setIsDropdownVisible(false);
                }}
              >
                + Add new contributor "{searchQuery}"
              </button>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2 text-[#4d4d4d] text-xs">
        {`${selectedContributors.length} selected`}
      </div>
      <CreateContributorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialName={searchQuery}
        role={role}
        onSubmit={(newContributor) => {
          const created = onCreateContributor(newContributor);
          handleSelect(created);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};
