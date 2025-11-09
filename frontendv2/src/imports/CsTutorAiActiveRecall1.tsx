import svgPaths from "./svg-qef6q0id3s";
import imgAiTutorLogo from "figma:asset/831d76f506f1dc02aaa78fa1316452543accee12.png";
import { imgVector } from "./svg-smqt3";

function Icon() {
  return (
    <div className="absolute contents inset-[20.833%]" data-name="Icon">
      <div className="absolute bottom-[20.83%] left-[20.83%] right-1/2 top-[20.83%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-14.29%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 11">
            <path d={svgPaths.p1073e080} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33246" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/2 left-[20.83%] right-[20.83%] top-1/2" data-name="Vector_2">
        <div className="absolute inset-[-0.67px_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 2">
            <path d="M9.99353 0.666231H0.666231" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33246" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[15.99px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Icon />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[12px] size-[15.99px] top-[10px]" data-name="Container">
      <Icon1 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[20px] left-[45.99px] top-[5.99px] w-[108.177px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[14px] text-neutral-950 text-nowrap top-[0.22px] whitespace-pre">Back to Selection</p>
    </div>
  );
}

function BackButton() {
  return (
    <div className="absolute h-[35.99px] left-0 rounded-[8px] top-0 w-[166.719px]" data-name="BackButton">
      <Container />
      <Paragraph />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[23.993px] left-0 top-[-2px] w-[56.024px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-neutral-950 text-nowrap top-[-0.78px] whitespace-pre">AI Tutor</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[20px] left-0 top-[23.99px] w-[266.927px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#717182] text-[14px] text-nowrap top-[0.22px] whitespace-pre">CS 101 - Introduction to Computer Science</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute h-[43.993px] left-[62.99px] top-[2px] w-[265px]" data-name="Container">
      <Paragraph1 />
      <Paragraph2 />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute bg-[rgba(3,2,19,0.1)] left-0 rounded-[10px] size-[47.986px] top-[0.02px]" data-name="Container">
      <div className="absolute left-[7px] size-[33px] top-[7.02px]" data-name="AI tutor logo">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgAiTutorLogo} />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute h-[47.986px] left-0 top-[55.99px] w-[855.99px]" data-name="Container">
      <Container1 />
      <Container2 />
    </div>
  );
}

function Header() {
  return (
    <div className="absolute h-[103.993px] left-[387px] top-[92.99px] w-[856.007px]" data-name="Header">
      <BackButton />
      <Container3 />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute h-[28.993px] left-0 rounded-[14px] top-0 w-[427.986px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1.111px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute h-[20px] left-[199.2px] top-[5px] w-[29.583px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[14px] text-neutral-950 text-nowrap top-[0.22px] whitespace-pre">Chat</p>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute h-[28.993px] left-[2.5px] rounded-[14px] top-[2.99px] w-[427.986px]" data-name="Button">
      <Container5 />
      <Paragraph3 />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute h-[28.993px] left-0 rounded-[14px] top-0 w-[427.986px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1.111px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="absolute h-[20px] left-[173.52px] top-[4.5px] w-[80.92px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[14px] text-neutral-950 text-nowrap top-[0.22px] whitespace-pre">Active Recall</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-white h-[28.993px] left-[427.99px] rounded-[14px] top-[3.49px] w-[427.986px]" data-name="Button">
      <Container6 />
      <Paragraph4 />
    </div>
  );
}

function TabList() {
  return (
    <div className="absolute bg-[#ececf0] h-[35px] left-0 rounded-[14px] top-0 w-[857.986px]" data-name="TabList">
      <Button />
      <Button2 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="absolute h-[20px] left-0 top-[7.99px] w-[92.621px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#717182] text-[14px] text-nowrap top-[0.22px] whitespace-pre">Grading Mode:</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="absolute h-[20px] left-[15.99px] top-[7.99px] w-[78.594px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[14px] text-nowrap text-white top-[0.22px] whitespace-pre">Easy Grader</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute h-[35.99px] left-0 rounded-[8px] top-0 w-[110.573px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1.111px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute bg-[#030213] h-[35.99px] left-[104.62px] rounded-[8px] top-0 w-[110.573px]" data-name="Button">
      <Paragraph6 />
      <Container7 />
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="absolute h-[20px] left-[15.99px] top-[7.99px] w-[58.385px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[14px] text-neutral-950 text-nowrap top-[0.22px] whitespace-pre">Balanced</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute h-[35.99px] left-0 rounded-[8px] top-0 w-[90.365px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1.111px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute bg-white h-[35.99px] left-[227.19px] rounded-[8px] top-0 w-[90.365px]" data-name="Button">
      <Paragraph7 />
      <Container8 />
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="absolute h-[20px] left-[15.99px] top-[7.99px] w-[85.608px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[14px] text-neutral-950 text-nowrap top-[0.22px] whitespace-pre">Tough Grader</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute h-[35.99px] left-0 rounded-[8px] top-0 w-[117.587px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1.111px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute bg-white h-[35.99px] left-[329.55px] rounded-[8px] top-0 w-[117.587px]" data-name="Button">
      <Paragraph8 />
      <Container9 />
    </div>
  );
}

function GraderModeSelector() {
  return (
    <div className="absolute h-[35.99px] left-0 top-[98.99px] w-[856.007px]" data-name="GraderModeSelector">
      <Paragraph5 />
      <Button3 />
      <Button5 />
      <Button6 />
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="absolute h-[20px] left-0 top-0 w-[94.983px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#717182] text-[14px] top-[0.22px] w-[95px]">Question 1 of 2</p>
    </div>
  );
}

function Container10() {
  return <div className="bg-green-400 h-[7.986px] shrink-0 w-full" data-name="Container" />;
}

function Container11() {
  return (
    <div className="absolute bg-[#030213] box-border content-stretch flex flex-col h-[7.986px] items-start left-0 overflow-clip pl-0 pr-[428.003px] py-0 rounded-[3.35544e+07px] top-[27.99px] w-[856.007px]" data-name="Container">
      <Container10 />
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute h-[35.972px] left-0 top-0 w-[856.007px]" data-name="Container">
      <Paragraph9 />
      <Container11 />
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="absolute h-[23.993px] left-[23.99px] top-[69.98px] w-[808.021px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-neutral-950 text-nowrap top-[-0.78px] whitespace-pre">Explain the difference between a stack and a queue, including their key principles.</p>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#717182] text-[14px] text-nowrap top-[0.22px] whitespace-pre">Your Answer:</p>
    </div>
  );
}

function TextArea() {
  return (
    <div className="bg-[#f9f9fb] h-[120px] relative rounded-[8px] shrink-0 w-full" data-name="Text Area">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[120px] items-start p-[12px] relative w-full">
          <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-[rgba(10,10,10,0.5)] text-nowrap whitespace-pre">Type your answer here...</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[1.111px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[7.986px] h-[154.219px] items-start left-[23.99px] top-[117.97px] w-[808.021px]" data-name="Container">
      <Paragraph11 />
      <TextArea />
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute h-[356.163px] left-0 rounded-[14px] top-0 w-[856.007px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1.111px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="absolute h-[16.007px] left-[10px] top-[2.99px] w-[47.986px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-[24.5px] text-[#030213] text-[12px] text-center text-nowrap top-[0.11px] translate-x-[-50%] whitespace-pre">Question</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute h-[21.997px] left-0 overflow-clip rounded-[8px] top-0 w-[67.986px]" data-name="Container">
      <Paragraph12 />
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute h-[21.997px] left-0 rounded-[8px] top-0 w-[67.986px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1.111px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute bg-[#eceef2] h-[21.997px] left-[23.99px] rounded-[8px] top-[23.99px] w-[67.986px]" data-name="Container">
      <Container15 />
      <Container16 />
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[14px] text-nowrap text-white top-[0.22px] whitespace-pre">Submit Answer</p>
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute bg-[#030213] box-border content-stretch flex flex-col h-[35.99px] items-start left-[690.64px] pb-0 pt-[7.986px] px-[23.993px] rounded-[8px] top-[296.18px] w-[141.372px]" data-name="Button">
      <Paragraph13 />
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute bg-white h-[356.163px] left-0 rounded-[14px] top-[65.97px] w-[856.007px]" data-name="Container">
      <Paragraph10 />
      <Container13 />
      <Container14 />
      <Container17 />
      <Button7 />
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute h-[35.99px] left-0 rounded-[8px] top-0 w-[114.01px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1.111px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute bottom-1/4 contents left-[37.5%] right-[37.5%] top-1/4" data-name="Icon">
      <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 10">
            <path d={svgPaths.p7e928c0} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33246" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="h-[15.99px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Icon3 />
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[19.5px] size-[15.99px] top-[10px]" data-name="Container">
      <Icon4 />
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="absolute h-[20px] left-[40px] top-[7.99px] w-[55px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[14px] text-neutral-950 text-nowrap top-[0.22px] whitespace-pre">Previous</p>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute h-[35.99px] left-0 top-0 w-[114.01px]" data-name="Container">
      <Container20 />
      <Paragraph14 />
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute bg-white h-[35.99px] left-0 opacity-50 rounded-[8px] top-0 w-[114.01px]" data-name="Button">
      <Container19 />
      <Container21 />
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="absolute h-[20px] left-[22.76px] top-[7px] w-[28.802px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[14px] text-nowrap text-white top-[0.22px] whitespace-pre">Next</p>
    </div>
  );
}

function Icon7() {
  return (
    <div className="absolute bottom-1/4 contents left-[37.5%] right-[37.5%] top-1/4" data-name="Icon">
      <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 10">
            <path d={svgPaths.p2eabcf40} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33246" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="h-[15.99px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Icon7 />
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[53.77px] size-[15.99px] top-[8.99px]" data-name="Container">
      <Icon8 />
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[35.99px] relative shrink-0 w-full" data-name="Container">
      <Paragraph15 />
      <Container22 />
    </div>
  );
}

function Button9() {
  return (
    <div className="absolute bg-[#030213] content-stretch flex flex-col h-[35.99px] items-start left-[767.76px] opacity-50 rounded-[8px] top-0 w-[88.246px]" data-name="Button">
      <Container23 />
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute h-[35.99px] left-0 top-[452.13px] w-[856.007px]" data-name="Container">
      <Button8 />
      <Button9 />
    </div>
  );
}

function ActiveRecallInterface() {
  return (
    <div className="absolute h-[488.125px] left-0 top-[198.98px] w-[856.007px]" data-name="ActiveRecallInterface">
      <Container12 />
      <Container18 />
      <Container24 />
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute h-[711.094px] left-[387px] top-[226.98px] w-[856.007px]" data-name="Container">
      <TabList />
      <GraderModeSelector />
      <ActiveRecallInterface />
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute h-[65px] left-0 top-0 w-[1630px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1.111px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Icon9() {
  return (
    <div className="absolute contents inset-[8.33%_8.33%_8.35%_8.33%]" data-name="Icon">
      <div className="absolute bottom-1/4 left-1/2 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-10px_-4.167px] mask-size-[20px_20px] right-1/2 top-[20.83%]" data-name="Vector" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-7.69%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 13">
            <path d="M0.833335 11.6667V0.833335" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%_37.5%_45.83%_37.5%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-7.5px] mask-size-[20px_20px]" data-name="Vector_2" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-25%_-16.67%_-25.01%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 5">
            <path d={svgPaths.p2b1c2780} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[72.92%] left-1/4 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5px_-1.667px] mask-size-[20px_20px] right-1/4 top-[8.33%]" data-name="Vector_3" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-22.22%_-8.33%_-22.23%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 6">
            <path d={svgPaths.p3127b190} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[21.35%_12.5%_54.6%_74.99%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-14.997px_-4.271px] mask-size-[20px_20px]" data-name="Vector_4" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-17.34%_-33.29%_-17.33%_-33.3%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 7">
            <path d={svgPaths.p3f5f4f80} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-3/4 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-15px_-8.78px] mask-size-[20px_20px] right-[8.33%] top-[43.9%]" data-name="Vector_5" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-13.4%_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 8">
            <path d={svgPaths.p3c17c400} id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[72.85%_16.67%_8.35%_16.67%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-3.333px_-14.569px] mask-size-[20px_20px]" data-name="Vector_6" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-22.16%_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 6">
            <path d={svgPaths.p3003e200} id="Vector_6" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-[8.33%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.667px_-8.78px] mask-size-[20px_20px] right-3/4 top-[43.9%]" data-name="Vector_7" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-13.4%_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 8">
            <path d={svgPaths.p1a85c800} id="Vector_7" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[21.35%_74.99%_54.6%_12.5%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.499px_-4.271px] mask-size-[20px_20px]" data-name="Vector_8" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-17.34%_-33.3%_-17.33%_-33.29%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 7">
            <path d={svgPaths.p3634b300} id="Vector_8" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Icon9 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <ClipPathGroup />
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[5.99px] size-[20px] top-[5.99px]" data-name="Icon6">
      <Icon10 />
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute bg-[#030213] left-0 rounded-[10px] size-[31.997px] top-0" data-name="Container">
      <Icon6 />
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[30px] left-0 text-[20px] text-neutral-950 text-nowrap top-[-0.67px] whitespace-pre">Canvas Tailored</p>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute box-border content-stretch flex flex-col h-[30px] items-start left-[42px] pb-0 pl-0 top-[0.99px] w-[140.747px]" data-name="Container">
      <Paragraph16 />
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute h-[31.997px] left-[32px] top-[15.99px] w-[182.743px]" data-name="Container">
      <Container27 />
      <Container28 />
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute h-[65px] left-0 top-0 w-[1630px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1.111px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Icon11() {
  return (
    <div className="absolute contents inset-[8.33%_8.33%_8.35%_8.33%]" data-name="Icon">
      <div className="absolute bottom-1/4 left-1/2 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-10px_-4.167px] mask-size-[20px_20px] right-1/2 top-[20.83%]" data-name="Vector" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-7.69%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 13">
            <path d="M0.833335 11.6667V0.833335" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%_37.5%_45.83%_37.5%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-7.5px] mask-size-[20px_20px]" data-name="Vector_2" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-25%_-16.67%_-25.01%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 5">
            <path d={svgPaths.p2b1c2780} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[72.92%] left-1/4 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5px_-1.667px] mask-size-[20px_20px] right-1/4 top-[8.33%]" data-name="Vector_3" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-22.22%_-8.33%_-22.23%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 6">
            <path d={svgPaths.p3127b190} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[21.35%_12.5%_54.6%_74.99%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-14.997px_-4.271px] mask-size-[20px_20px]" data-name="Vector_4" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-17.34%_-33.29%_-17.33%_-33.3%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 7">
            <path d={svgPaths.p3f5f4f80} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-3/4 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-15px_-8.78px] mask-size-[20px_20px] right-[8.33%] top-[43.9%]" data-name="Vector_5" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-13.4%_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 8">
            <path d={svgPaths.p3c17c400} id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[72.85%_16.67%_8.35%_16.67%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-3.333px_-14.569px] mask-size-[20px_20px]" data-name="Vector_6" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-22.16%_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 6">
            <path d={svgPaths.p3003e200} id="Vector_6" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-[8.33%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.667px_-8.78px] mask-size-[20px_20px] right-3/4 top-[43.9%]" data-name="Vector_7" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-13.4%_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 8">
            <path d={svgPaths.p1a85c800} id="Vector_7" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[21.35%_74.99%_54.6%_12.5%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.499px_-4.271px] mask-size-[20px_20px]" data-name="Vector_8" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-17.34%_-33.3%_-17.33%_-33.29%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 7">
            <path d={svgPaths.p3634b300} id="Vector_8" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup1() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Icon11 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <ClipPathGroup1 />
    </div>
  );
}

function Icon13() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[5.99px] size-[20px] top-[5.99px]" data-name="Icon6">
      <Icon12 />
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute bg-[#030213] left-0 rounded-[10px] size-[31.997px] top-0" data-name="Container">
      <Icon13 />
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[30px] left-0 text-[20px] text-neutral-950 text-nowrap top-[-0.67px] whitespace-pre">Canvas Tailored</p>
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute box-border content-stretch flex flex-col h-[30px] items-start left-[42px] pb-0 pl-0 top-[0.99px] w-[140.747px]" data-name="Container">
      <Paragraph17 />
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute h-[31.997px] left-[32px] top-[15.99px] w-[182.743px]" data-name="Container">
      <Container31 />
      <Container32 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_6073)" id="Icon">
          <path d="M10 15V4.16667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p28aa85e0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p34b2be80} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p28f84600} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p281563c0} id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3750e2c0} id="Vector_6" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p140e6400} id="Vector_7" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2a64bf00} id="Vector_8" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_1_6073">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container34() {
  return (
    <div className="bg-[#030213] relative rounded-[10px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon14 />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="basis-0 grow h-[30px] min-h-px min-w-px relative shrink-0" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[30px] relative w-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[30px] left-0 text-[20px] text-neutral-950 text-nowrap top-[-3px] whitespace-pre">Canvas Tailored</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="absolute content-stretch flex gap-[10px] h-[32px] items-center left-[32px] top-[16px] w-[182.75px]" data-name="Container">
      <Container34 />
      <Heading />
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p275d2400} id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1db6d780} id="Vector_2" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="basis-0 grow h-[24px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#717182] text-[16px] text-nowrap top-[-2px] whitespace-pre">Home</p>
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="absolute box-border content-stretch flex gap-[10px] h-[40px] items-center left-[279.84px] px-[16px] py-0 rounded-[10px] top-0 w-[104.891px]" data-name="Button">
      <Icon15 />
      <Text />
    </div>
  );
}

function Icon16() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M6.66667 1.66667V5" id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M13.3333 1.66667V5" id="Vector_2" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1da67b80} id="Vector_3" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M2.5 8.33333H17.5" id="Vector_4" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="basis-0 grow h-[24px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#717182] text-[16px] text-nowrap top-[-2px] whitespace-pre">Planner</p>
      </div>
    </div>
  );
}

function Button11() {
  return (
    <div className="absolute box-border content-stretch flex gap-[10px] h-[40px] items-center left-[527.72px] px-[16px] py-0 rounded-[10px] top-0 w-[115.016px]" data-name="Button">
      <Icon16 />
      <Text2 />
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p3ac0b600} id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3c797180} id="Vector_2" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text3() {
  return (
    <div className="basis-0 grow h-[24px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#717182] text-[16px] text-nowrap top-[-2px] whitespace-pre">Insights</p>
      </div>
    </div>
  );
}

function Button12() {
  return (
    <div className="absolute box-border content-stretch flex gap-[10px] h-[40px] items-center left-[646.73px] px-[16px] py-0 rounded-[10px] top-0 w-[116.672px]" data-name="Button">
      <Icon17 />
      <Text3 />
    </div>
  );
}

function Icon18() {
  return (
    <div className="absolute contents inset-[8.33%_8.34%_8.35%_8.33%]" data-name="Icon">
      <div className="absolute bottom-1/4 left-1/2 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-10px_-4.167px] mask-size-[20px_20px] right-1/2 top-[20.83%]" data-name="Vector" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-7.69%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 13">
            <path d="M0.833335 11.6667V0.833335" id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%_37.5%_45.83%_37.5%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-7.5px] mask-size-[20px_20px]" data-name="Vector_2" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-25%_-16.67%_-25.01%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 5">
            <path d={svgPaths.p2b1c2780} id="Vector_2" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[72.92%] left-1/4 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5px_-1.667px] mask-size-[20px_20px] right-1/4 top-[8.33%]" data-name="Vector_3" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-22.22%_-8.33%_-22.23%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 6">
            <path d={svgPaths.p3127b190} id="Vector_3" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[21.35%_12.5%_54.6%_74.99%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-14.998px_-4.271px] mask-size-[20px_20px]" data-name="Vector_4" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-17.34%_-33.29%_-17.33%_-33.3%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 7">
            <path d={svgPaths.p3f5f4f80} id="Vector_4" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-3/4 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-15px_-8.78px] mask-size-[20px_20px] right-[8.33%] top-[43.9%]" data-name="Vector_5" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-13.4%_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 8">
            <path d={svgPaths.p3c17c400} id="Vector_5" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[72.85%_16.67%_8.35%_16.67%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-3.333px_-14.569px] mask-size-[20px_20px]" data-name="Vector_6" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-22.16%_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 6">
            <path d={svgPaths.p3003e200} id="Vector_6" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-[8.33%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.667px_-8.78px] mask-size-[20px_20px] right-3/4 top-[43.9%]" data-name="Vector_7" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-13.4%_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 8">
            <path d={svgPaths.p1f16af80} id="Vector_7" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[21.35%_74.99%_54.6%_12.5%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.5px_-4.271px] mask-size-[20px_20px]" data-name="Vector_8" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-17.34%_-33.3%_-17.33%_-33.29%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 7">
            <path d={svgPaths.p2078fc00} id="Vector_8" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup2() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Icon18 />
    </div>
  );
}

function Icon19() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <ClipPathGroup2 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[15.99px] size-[20px] top-[10px]" data-name="Icon2">
      <Icon19 />
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="h-[23.993px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#717182] text-[16px] text-nowrap top-[-0.78px] whitespace-pre">Flashcards</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute box-border content-stretch flex flex-col h-[23.993px] items-start left-[45.99px] pb-0 pl-0 top-[8px] w-[73.004px]" data-name="Text1">
      <Paragraph18 />
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute h-[40px] left-[386.25px] rounded-[10px] top-0 w-[134.983px]" data-name="Button1">
      <Icon2 />
      <Text1 />
    </div>
  );
}

function Icon20() {
  return (
    <div className="absolute bottom-[16.67%] contents left-1/4 right-1/4 top-[16.67%]" data-name="Icon">
      <div className="absolute bottom-1/2 left-[33.33%] right-[33.33%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
            <path d={svgPaths.p309ec280} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[33.33%] left-1/2 right-1/2 top-1/2" data-name="Vector">
        <div className="absolute inset-[-25%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 5">
            <path d="M0.833335 0.833335V4.16663" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-1/4 right-[62.5%] top-[58.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-33.34%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
            <path d={svgPaths.p3de5d180} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-[62.5%] right-1/4 top-[58.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-33.34%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
            <path d={svgPaths.p1e1b8a80} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[83.33%_33.33%_16.67%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-0.83px_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 2">
            <path d="M0.833335 0.833335H7.49996" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon21() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Icon20 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[15.99px] size-[20px] top-[10px]" data-name="Icon5">
      <Icon21 />
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute h-[23.993px] left-[45.99px] top-[5.99px] w-[56.024px]" data-name="Text4">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-neutral-950 text-nowrap top-[-0.78px] whitespace-pre">AI Tutor</p>
    </div>
  );
}

function Container4() {
  return <div className="absolute bg-[#030213] h-[1.997px] left-0 top-[37.99px] w-[115px]" data-name="Container4" />;
}

function Button4() {
  return (
    <div className="absolute h-[40px] left-[763.25px] rounded-[10px] top-0 w-[115px]" data-name="Button4">
      <Icon5 />
      <Text4 />
      <Container4 />
    </div>
  );
}

function Navigation() {
  return (
    <div className="absolute h-[40px] left-[246.75px] top-[12px] w-[1043.25px]" data-name="Navigation">
      <Button10 />
      <Button11 />
      <Button12 />
      <Button1 />
      <Button4 />
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Container">
      <Container35 />
      <Navigation />
    </div>
  );
}

function TopNavigation() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.6)] box-border content-stretch flex flex-col h-[65px] items-start left-0 pb-px pt-0 px-0 top-0 w-[1630px]" data-name="TopNavigation">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <Container36 />
    </div>
  );
}

function TopNavigation1() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.6)] h-[65px] left-0 top-0 w-[1630px]" data-name="TopNavigation">
      <Container30 />
      <Container33 />
      <TopNavigation />
    </div>
  );
}

function TopNavigation2() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.6)] h-[65px] left-0 top-0 w-[1630px]" data-name="TopNavigation">
      <Container26 />
      <Container29 />
      <TopNavigation1 />
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute bg-white h-[998px] left-0 top-[7px] w-[1630px]" data-name="Container">
      <Header />
      <Container25 />
      <TopNavigation2 />
    </div>
  );
}

export default function CsTutorAiActiveRecall() {
  return (
    <div className="bg-white relative size-full" data-name="CS Tutor AI Active Recall 1">
      <Container37 />
    </div>
  );
}