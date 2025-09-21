import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import JavaScriptNotesSidebar from './components/JavaScriptNotesSideBar';
import JsHeroPage from './components/JsHeroPage';
import Loader from '../../../components/Layout/SplashScreen';
import Breadcrumb from '../../../components/Layout/Breadcrumb';
import useMobile from '../../../hooks/useMobile';
import JsPageTitleManager from './components/JsPageTitleManager';

// Import note components

// Introduction
import JsIntroduction from './JsTopics/Introduction/JsIntroduction';
import JsExecution from './JsTopics/Introduction/JsExecution';
import NodeJsInstallation from './JsTopics/Introduction/NodeJsInstallation';

// JavaScript Variables
import WhatAreVariables from './JsTopics/JsVariables/WhatAreVariables';
import VarLetConst from './JsTopics/JsVariables/VarLetConst';
import PrimitivesAndObjects from './JsTopics/JsVariables/PrimitivesAndObjects';
import VariableNamingRules from './JsTopics/JsVariables/VariableNamingRules';
import OperatorsAndExpressions from './JsTopics/JsVariables/OperatorsAndExpressions';

// JavaScript Basics
import IfElseConditionals from './JsTopics/JsBasics/IfElseConditionals';
import IfElseLadder from './JsTopics/JsBasics/IfElseLadder';
import SwitchCase from './JsTopics/JsBasics/SwitchCase';
import TernaryOperator from './JsTopics/JsBasics/TernaryOperator';
import ForLoops from './JsTopics/JsBasics/ForLoops';
import WhileLoops from './JsTopics/JsBasics/WhileLoops';
import Functions from './JsTopics/JsBasics/Functions';

// JavaScript Objects
import Strings from './JsTopics/JsObjects/StringsInJS';
import ArraysAndMethods from './JsTopics/JsObjects/ArraysAndMethods';
import LoopsWithArrays from './JsTopics/JsObjects/LoopsWithArrays';
import MapFilterAndReduce from './JsTopics/JsObjects/MapFilterReduce';
import DateInJs from './JsTopics/JsObjects/DateInJS';
import MathInJs from './JsTopics/JsObjects/MathInJS';
import NumberInJs from './JsTopics/JsObjects/NumberInJS';
import BooleanInJs from './JsTopics/JsObjects/BooleanInJS';

// JavaScript DOM and BOM
import JsWindowObject from './JsTopics/Dom_Bom/JsWindowObject';
import JsHistoryObject from './JsTopics/Dom_Bom/JsHistoryObject';
import JsNavigatorObject from './JsTopics/Dom_Bom/JsNavigatorObject';
import JsScreenObject from './JsTopics/Dom_Bom/JsScreenObject';
import JsDocumentObject from './JsTopics/Dom_Bom/JsDocumentObject';
import JsGetElementById from './JsTopics/Dom_Bom/JsGetElementById';
import JsGetElementsByClassName from './JsTopics/Dom_Bom/JsGetElementsByClassName';
import JsGetElementsByName from './JsTopics/Dom_Bom/JsGetElementsByName';
import JsGetElementsByTagName from './JsTopics/Dom_Bom/JsGetElementsByTagName';
import JsInnerHTML from './JsTopics/Dom_Bom/JsInnerHTML';
import JsOuterHTML from './JsTopics/Dom_Bom/JsOuterHTML';

// JavaScript OOPS
import JsClass from './JsTopics/Oops/JsClass';
import JsObjects from './JsTopics/Oops/JsObjects';
import JsStaticMethod from './JsTopics/Oops/JsStaticMethod';
import JsConstructor from './JsTopics/Oops/JsConstructor';
import JsEncapsulation from './JsTopics/Oops/JsEncapsulation';
import JsInheritance from './JsTopics/Oops/JsInheritance';
import JsPolymorphism from './JsTopics/Oops/JsPolymorphism';
import JsAbstraction from './JsTopics/Oops/JsAbstraction';


const JavaScriptFundamentals = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useMobile(768);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [location, isMobile]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative min-h-screen">
      {/* Background grid and gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-[size:30px_30px]">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-bg-primary/90 via-transparent to-dark-bg-primary/50"></div>
      </div>

      <div className="flex min-h-screen relative">
        {/* Overlay for mobile */}
        {isMobile && isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Sidebar */}
        <div className={`
          fixed md:sticky top-14 sm:top-16 left-0 h-[calc(100vh-3.6rem)] sm:h-[calc(100vh-4rem)] z-30
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          md:w-64 w-64
        `}>
          <JavaScriptNotesSidebar onNavigate={toggleSidebar} />
        </div>

        {/* Main Content */}
        <main className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'ml-0' : 'md:ml-0'}`}>
          {/* Breadcrumb */}
          <Breadcrumb isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} className={"p-4"} />

          {/* Page Title Manager */}
          <JsPageTitleManager />

          {/* ROUTES OF THE SUB NOTES */}
          <div className="p-4 md:p-8">
            <React.Suspense fallback={<Loader fullPage={true} title="Loading..." subtitle="Please wait while we set things up." />}>
              <Routes>
                <Route index element={<JsHeroPage />} />

                {/* Introduction */}
                <Route path="introduction" element={<JsIntroduction />} />
                <Route path="execution" element={<JsExecution />} />
                <Route path="node.js-installation" element={<NodeJsInstallation />} />

                {/* Javascript variables */}
                <Route path="what-are-variables" element={<WhatAreVariables />} />
                <Route path="variable-naming-rules" element={<VariableNamingRules />} />
                <Route path="primitives-and-objects" element={<PrimitivesAndObjects />} />
                <Route path="operators-and-expressions" element={<OperatorsAndExpressions />} />
                <Route path="var-vs-let-vs-const" element={<VarLetConst />} />

                {/* Javascript basics */}
                <Route path="if-else-conditionals" element={<IfElseConditionals />} />
                <Route path="if-else-ladder" element={<IfElseLadder />} />
                <Route path="switch-case" element={<SwitchCase />} />
                <Route path="ternary-operator" element={<TernaryOperator />} />
                <Route path="for-loops" element={<ForLoops />} />
                <Route path="while-loops" element={<WhileLoops />} />
                <Route path="functions" element={<Functions />} />

                {/* Javascript objects */}
                <Route path="strings" element={<Strings />} />
                <Route path="arrays-and-array-methods" element={<ArraysAndMethods />} />
                <Route path="loops-with-arrays" element={<LoopsWithArrays />} />
                <Route path="map-filter-reduce" element={<MapFilterAndReduce />} />
                <Route path="date" element={<DateInJs />} />
                <Route path="math" element={<MathInJs />} />
                <Route path="number" element={<NumberInJs />} />
                <Route path="boolean" element={<BooleanInJs />} />

                {/* DOM and BOM */}
                <Route path="window-object" element={<JsWindowObject />} />
                <Route path="history-object" element={<JsHistoryObject />} />
                <Route path="navigator-object" element={<JsNavigatorObject />} />
                <Route path="screen-object" element={<JsScreenObject />} />
                <Route path="document-object" element={<JsDocumentObject />} />
                <Route path="getElementById" element={<JsGetElementById />} />
                <Route path="getElementsByClassName" element={<JsGetElementsByClassName />} />
                <Route path="getElementsByName" element={<JsGetElementsByName />} />
                <Route path="getElementsByTagName" element={<JsGetElementsByTagName />} />
                <Route path="innerHTML" element={<JsInnerHTML />} />
                <Route path="outerHTML" element={<JsOuterHTML />} />

                {/* OOPS */}
                <Route path="class" element={<JsClass />} />
                <Route path="objects" element={<JsObjects />} />
                <Route path="static-method" element={<JsStaticMethod />} />
                <Route path="constructor" element={<JsConstructor />} />
                <Route path="encapsulation" element={<JsEncapsulation />} />
                <Route path="inheritance" element={<JsInheritance />} />
                <Route path="polymorphism" element={<JsPolymorphism />} />
                <Route path="abstraction" element={<JsAbstraction />} />


              </Routes>
            </React.Suspense>
          </div>

        </main>
      </div>
    </div>
  );
};

export default JavaScriptFundamentals;
