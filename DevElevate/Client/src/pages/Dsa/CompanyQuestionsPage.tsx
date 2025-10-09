import { useState } from 'react';
import { useGlobalState } from "../../contexts/GlobalContext";
import CompanySelector from './CompanySelector';
import { QuestionProvider } from './QuestionContext';
import CompanyQuestionsList from './CompanyQuestionsList';
import type { Company } from './data/companyQuestions';
import { companies } from './data/companyQuestions';

export default function CompanyQuestionsPage() {
  const { state } = useGlobalState();
  const [selectedCompany, setSelectedCompany] = useState<Company | undefined>(undefined);

  return (
    <QuestionProvider>
      <div className={`min-h-screen ${state.darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="px-4 py-8 mx-auto max-w-6xl sm:px-6 lg:px-8">
          <CompanySelector selectedCompany={selectedCompany} onCompanySelect={setSelectedCompany} />

          {selectedCompany && (
            <div className="mt-6">
              <CompanyQuestionsList
                companyName={selectedCompany.name}
                questions={(companies.find(c => c.id === selectedCompany.id)?.questions) || []}
              />
            </div>
          )}
        </div>
      </div>
    </QuestionProvider>
  );
}


