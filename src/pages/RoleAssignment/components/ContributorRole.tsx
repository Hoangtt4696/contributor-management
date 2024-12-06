import { mockContributors } from '@/data/contributors';
import { ContributorSearch } from '@/pages/RoleAssignment/components/ContributorSearch';
import { Contributor, ContributorRole } from '@/types';

type ContributorRoleProps = {
  label: string;
  required: boolean;
  selectedContributors: Contributor[];
  onSelect: (selected: Contributor[]) => void;
  role: ContributorRole;
  onCreateContributor: (newContributor: Omit<Contributor, 'contributorId'>) => Contributor;
  error?: string;
};

const Role: React.FC<ContributorRoleProps> = ({
  label,
  role,
  selectedContributors,
  required,
  onSelect,
  onCreateContributor,
  error,
}) => {
  return (
    <div className="space-y-4 bg-[#09090B] rounded-lg p-4">
      <ContributorSearch
        label={label}
        contributors={mockContributors.filter((c) => c.contributorRole === role)}
        selectedContributors={selectedContributors}
        onSelect={onSelect}
        required={required}
        allowMultiple
        role={role}
        onCreateContributor={onCreateContributor}
      />
      
      {error && (
        <p className="text-sm text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default Role;
