import svgPaths from "./svg-mmjoz98dn6";

function Heading() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[36px] left-0 text-[24px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">Study Insights</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#717182] text-[16px] text-nowrap top-[-2px] whitespace-pre">Track your learning progress, study patterns, and performance metrics</p>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[64px] items-start left-[185.5px] top-[93px] w-[1240px]" data-name="Container">
      <Heading />
      <Paragraph />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_7493)" id="Icon">
          <path d="M10 5V10L13.3333 11.6667" id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p14d24500} id="Vector_2" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_1_7493">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-[rgba(245,73,0,0.1)] relative rounded-[10px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[40px]">
        <Icon />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[9px] size-[12px] top-[5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M8 3.5H11V6.5" id="Vector" stroke="var(--stroke-0, #009689)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p3a7e7417} id="Vector_2" stroke="var(--stroke-0, #009689)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Badge() {
  return (
    <div className="h-[22px] relative rounded-[8px] shrink-0 w-[67.906px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[22px] overflow-clip relative rounded-[inherit] w-[67.906px]">
        <Icon1 />
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-[29px] text-[#009689] text-[12px] text-nowrap top-[2px] whitespace-pre">+12%</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,150,137,0.5)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function InsightsView() {
  return (
    <div className="absolute content-stretch flex h-[40px] items-start justify-between left-[21px] top-[21px] w-[253px]" data-name="InsightsView">
      <Container1 />
      <Badge />
    </div>
  );
}

function InsightsView1() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-start left-[21px] top-[103px] w-[253px]" data-name="InsightsView">
      <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[32px] min-h-px min-w-px relative shrink-0 text-[24px] text-neutral-950">41 hours</p>
    </div>
  );
}

function InsightsView2() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[21px] top-[169px] w-[253px]" data-name="InsightsView">
      <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[#717182] text-[14px]">Total Study Time</p>
    </div>
  );
}

function InsightsView3() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-[21px] top-[221px] w-[253px]" data-name="InsightsView">
      <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px relative shrink-0 text-[#717182] text-[12px]">This month</p>
    </div>
  );
}

function Card() {
  return (
    <div className="[grid-area:1_/_1] bg-white relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <InsightsView />
      <InsightsView1 />
      <InsightsView2 />
      <InsightsView3 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_7478)" id="Icon">
          <path d="M10 15V4.16667" id="Vector" stroke="var(--stroke-0, #009689)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p28aa85e0} id="Vector_2" stroke="var(--stroke-0, #009689)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.pb239900} id="Vector_3" stroke="var(--stroke-0, #009689)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p28f84600} id="Vector_4" stroke="var(--stroke-0, #009689)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p281563c0} id="Vector_5" stroke="var(--stroke-0, #009689)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3750e2c0} id="Vector_6" stroke="var(--stroke-0, #009689)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.pa5d0e00} id="Vector_7" stroke="var(--stroke-0, #009689)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p8b68e80} id="Vector_8" stroke="var(--stroke-0, #009689)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_1_7478">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-[rgba(0,150,137,0.1)] relative rounded-[10px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[40px]">
        <Icon2 />
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-[9px] size-[12px] top-[5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M8 3.5H11V6.5" id="Vector" stroke="var(--stroke-0, #009689)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p3a7e7417} id="Vector_2" stroke="var(--stroke-0, #009689)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Badge1() {
  return (
    <div className="h-[22px] relative rounded-[8px] shrink-0 w-[63.078px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[22px] overflow-clip relative rounded-[inherit] w-[63.078px]">
        <Icon3 />
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-[29px] text-[#009689] text-[12px] text-nowrap top-[2px] whitespace-pre">+8%</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,150,137,0.5)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function InsightsView4() {
  return (
    <div className="absolute content-stretch flex h-[40px] items-start justify-between left-[21px] top-[21px] w-[253px]" data-name="InsightsView">
      <Container2 />
      <Badge1 />
    </div>
  );
}

function InsightsView5() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-start left-[21px] top-[103px] w-[253px]" data-name="InsightsView">
      <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[32px] min-h-px min-w-px relative shrink-0 text-[24px] text-neutral-950">342</p>
    </div>
  );
}

function InsightsView6() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[21px] top-[169px] w-[253px]" data-name="InsightsView">
      <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[#717182] text-[14px]">Flashcards Reviewed</p>
    </div>
  );
}

function InsightsView7() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-[21px] top-[221px] w-[253px]" data-name="InsightsView">
      <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px relative shrink-0 text-[#717182] text-[12px]">This month</p>
    </div>
  );
}

function Card1() {
  return (
    <div className="[grid-area:1_/_2] bg-white relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <InsightsView4 />
      <InsightsView5 />
      <InsightsView6 />
      <InsightsView7 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_7464)" id="Icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, #FFB900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p240d7000} id="Vector_2" stroke="var(--stroke-0, #FFB900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p25499600} id="Vector_3" stroke="var(--stroke-0, #FFB900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_1_7464">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-[rgba(255,185,0,0.1)] relative rounded-[10px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[40px]">
        <Icon4 />
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute left-[9px] size-[12px] top-[5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M8 3.5H11V6.5" id="Vector" stroke="var(--stroke-0, #009689)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p3a7e7417} id="Vector_2" stroke="var(--stroke-0, #009689)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Badge2() {
  return (
    <div className="h-[22px] relative rounded-[8px] shrink-0 w-[63.078px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[22px] overflow-clip relative rounded-[inherit] w-[63.078px]">
        <Icon5 />
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-[29px] text-[#009689] text-[12px] text-nowrap top-[2px] whitespace-pre">+5%</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,150,137,0.5)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function InsightsView8() {
  return (
    <div className="absolute content-stretch flex h-[40px] items-start justify-between left-[21px] top-[21px] w-[253px]" data-name="InsightsView">
      <Container3 />
      <Badge2 />
    </div>
  );
}

function InsightsView9() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-start left-[21px] top-[103px] w-[253px]" data-name="InsightsView">
      <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[32px] min-h-px min-w-px relative shrink-0 text-[24px] text-neutral-950">86%</p>
    </div>
  );
}

function InsightsView10() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[21px] top-[169px] w-[253px]" data-name="InsightsView">
      <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[#717182] text-[14px]">Average Accuracy</p>
    </div>
  );
}

function InsightsView11() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-[21px] top-[221px] w-[253px]" data-name="InsightsView">
      <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px relative shrink-0 text-[#717182] text-[12px]">All courses</p>
    </div>
  );
}

function Card2() {
  return (
    <div className="[grid-area:1_/_3] bg-white relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <InsightsView8 />
      <InsightsView9 />
      <InsightsView10 />
      <InsightsView11 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p4352800} id="Vector" stroke="var(--stroke-0, #FE9A00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-[rgba(254,154,0,0.1)] relative rounded-[10px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[40px]">
        <Icon6 />
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="absolute left-[9px] size-[12px] top-[5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M8 3.5H11V6.5" id="Vector" stroke="var(--stroke-0, #009689)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p3a7e7417} id="Vector_2" stroke="var(--stroke-0, #009689)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Badge3() {
  return (
    <div className="h-[22px] relative rounded-[8px] shrink-0 w-[104.688px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[22px] overflow-clip relative rounded-[inherit] w-[104.688px]">
        <Icon7 />
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-[29px] text-[#009689] text-[12px] text-nowrap top-[2px] whitespace-pre">New record!</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,150,137,0.5)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function InsightsView12() {
  return (
    <div className="absolute content-stretch flex h-[40px] items-start justify-between left-[21px] top-[21px] w-[253px]" data-name="InsightsView">
      <Container4 />
      <Badge3 />
    </div>
  );
}

function InsightsView13() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-start left-[21px] top-[103px] w-[253px]" data-name="InsightsView">
      <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[32px] min-h-px min-w-px relative shrink-0 text-[24px] text-neutral-950">12 days</p>
    </div>
  );
}

function InsightsView14() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[21px] top-[169px] w-[253px]" data-name="InsightsView">
      <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[#717182] text-[14px]">Study Streak</p>
    </div>
  );
}

function InsightsView15() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-[21px] top-[221px] w-[253px]" data-name="InsightsView">
      <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px relative shrink-0 text-[#717182] text-[12px]">Current</p>
    </div>
  );
}

function Card3() {
  return (
    <div className="[grid-area:1_/_4] bg-white relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <InsightsView12 />
      <InsightsView13 />
      <InsightsView14 />
      <InsightsView15 />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute gap-[20px] grid grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[258px] left-[185.5px] top-[177px] w-[1240px]" data-name="Container">
      <Card />
      <Card1 />
      <Card2 />
      <Card3 />
    </div>
  );
}

function InsightsView16() {
  return (
    <div className="absolute h-[27px] left-[21px] top-[21px] w-[568px]" data-name="InsightsView">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[27px] left-0 text-[18px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">Study Time by Course</p>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[2.27%_0.88%_15.91%_11.44%]" data-name="Group">
      <div className="absolute bottom-[-0.28%] left-0 right-0 top-[-0.28%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 498 181">
          <g id="Group">
            <path d="M0 180.5H498" id="Vector" stroke="var(--stroke-0, black)" strokeDasharray="3 3" />
            <path d="M0 135.5H498" id="Vector_2" stroke="var(--stroke-0, black)" strokeDasharray="3 3" />
            <path d="M0 90.5H498" id="Vector_3" stroke="var(--stroke-0, black)" strokeDasharray="3 3" />
            <path d="M0 45.5H498" id="Vector_4" stroke="var(--stroke-0, black)" strokeDasharray="3 3" />
            <path d="M0 0.5H498" id="Vector_5" stroke="var(--stroke-0, black)" strokeDasharray="3 3" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[2.27%_0.88%_15.91%_11.44%]" data-name="Group">
      <div className="absolute bottom-0 left-[-0.1%] right-[-0.1%] top-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 499 180">
          <g id="Group">
            <path d="M50.3 0V180" id="Vector" stroke="var(--stroke-0, black)" strokeDasharray="3 3" />
            <path d="M149.9 0V180" id="Vector_2" stroke="var(--stroke-0, black)" strokeDasharray="3 3" />
            <path d="M249.5 0V180" id="Vector_3" stroke="var(--stroke-0, black)" strokeDasharray="3 3" />
            <path d="M349.1 0V180" id="Vector_4" stroke="var(--stroke-0, black)" strokeDasharray="3 3" />
            <path d="M448.7 0V180" id="Vector_5" stroke="var(--stroke-0, black)" strokeDasharray="3 3" />
            <path d="M0.5 0V180" id="Vector_6" stroke="var(--stroke-0, black)" strokeDasharray="3 3" />
            <path d="M498.5 0V180" id="Vector_7" stroke="var(--stroke-0, black)" strokeDasharray="3 3" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents inset-[2.27%_0.88%_15.91%_11.44%]" data-name="Group">
      <Group />
      <Group1 />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents inset-[84.09%_76.36%_7.04%_16.78%]" data-name="Group">
      <div className="absolute inset-[84.09%_79.79%_13.18%_20.21%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[86.14%_76.36%_7.04%_16.78%] leading-[normal] not-italic text-[12px] text-black text-center text-nowrap whitespace-pre">CS 101</p>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents inset-[84.09%_57.06%_7.04%_32.55%]" data-name="Group">
      <div className="absolute inset-[84.09%_62.25%_13.18%_37.75%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[86.14%_57.06%_7.04%_32.55%] leading-[normal] not-italic text-[12px] text-black text-center text-nowrap whitespace-pre">MATH 201</p>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents inset-[84.09%_39.79%_7.04%_50.35%]" data-name="Group">
      <div className="absolute inset-[84.09%_44.72%_13.18%_55.28%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[86.14%_39.79%_7.04%_50.35%] leading-[normal] not-italic text-[12px] text-black text-center text-nowrap whitespace-pre">PHYS 150</p>
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents inset-[84.09%_23.4%_7.04%_69.03%]" data-name="Group">
      <div className="absolute inset-[84.09%_27.18%_13.18%_72.82%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[86.14%_23.4%_7.04%_69.03%] leading-[normal] not-italic text-[12px] text-black text-center text-nowrap whitespace-pre">BIO 101</p>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents inset-[84.09%_5.33%_7.04%_86.04%]" data-name="Group">
      <div className="absolute inset-[84.09%_9.65%_13.18%_90.35%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[86.14%_5.33%_7.04%_86.04%] leading-[normal] not-italic text-[12px] text-black text-center text-nowrap whitespace-pre">ENG 102</p>
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute contents inset-[84.09%_5.33%_7.04%_16.78%]" data-name="Group">
      <Group3 />
      <Group4 />
      <Group5 />
      <Group6 />
      <Group7 />
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute contents inset-[84.09%_0.88%_7.04%_11.44%]" data-name="Group">
      <div className="absolute inset-[84.09%_0.88%_15.91%_11.44%]" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 498 1">
            <path d="M0 0.5H498" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <Group8 />
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute contents inset-[80.57%_88.56%_12.61%_8.63%]" data-name="Group">
      <div className="absolute inset-[84.09%_88.56%_15.91%_10.39%]" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 1">
            <path d="M0 0.5H6" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[80.57%_89.97%_12.61%_8.63%] leading-[normal] not-italic text-[12px] text-black text-nowrap text-right whitespace-pre">0</p>
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute contents inset-[60.12%_88.56%_33.06%_8.63%]" data-name="Group">
      <div className="absolute inset-[63.64%_88.56%_36.36%_10.39%]" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 1">
            <path d="M0 0.5H6" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[60.12%_89.97%_33.06%_8.63%] leading-[normal] not-italic text-[12px] text-black text-nowrap text-right whitespace-pre">3</p>
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute contents inset-[39.66%_88.56%_53.52%_8.63%]" data-name="Group">
      <div className="absolute inset-[43.18%_88.56%_56.82%_10.39%]" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 1">
            <path d="M0 0.5H6" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[39.66%_89.97%_53.52%_8.63%] leading-[normal] not-italic text-[12px] text-black text-nowrap text-right whitespace-pre">6</p>
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute contents inset-[19.21%_88.56%_73.97%_8.63%]" data-name="Group">
      <div className="absolute inset-[22.73%_88.56%_77.27%_10.39%]" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 1">
            <path d="M0 0.5H6" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[19.21%_89.97%_73.97%_8.63%] leading-[normal] not-italic text-[12px] text-black text-nowrap text-right whitespace-pre">9</p>
    </div>
  );
}

function Group14() {
  return (
    <div className="absolute contents inset-[1.94%_88.56%_91.25%_7.75%]" data-name="Group">
      <div className="absolute inset-[2.27%_88.56%_97.73%_10.39%]" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 1">
            <path d="M0 0.5H6" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[1.94%_89.97%_91.25%_7.75%] leading-[normal] not-italic text-[12px] text-black text-nowrap text-right whitespace-pre">12</p>
    </div>
  );
}

function Group15() {
  return (
    <div className="absolute contents inset-[1.94%_88.56%_12.61%_7.75%]" data-name="Group">
      <Group10 />
      <Group11 />
      <Group12 />
      <Group13 />
      <Group14 />
    </div>
  );
}

function Group16() {
  return (
    <div className="absolute contents inset-[1.94%_88.56%_12.61%_7.75%]" data-name="Group">
      <div className="absolute inset-[2.27%_88.56%_15.91%_11.44%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 180">
            <path d="M0.5 0V180" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <Group15 />
    </div>
  );
}

function Group17() {
  return (
    <div className="absolute inset-[2.27%_72.89%_15.91%_13.2%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 79 180">
        <g id="Group">
          <path d={svgPaths.p228af00} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group18() {
  return (
    <div className="absolute inset-[29.55%_55.36%_15.91%_30.73%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 79 120">
        <g id="Group">
          <path d={svgPaths.p374c1f80} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group19() {
  return (
    <div className="absolute inset-[15.91%_37.82%_15.91%_48.27%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 79 150">
        <g id="Group">
          <path d={svgPaths.p3e41d270} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group20() {
  return (
    <div className="absolute inset-[43.18%_20.29%_15.91%_65.8%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 79 90">
        <g id="Group">
          <path d={svgPaths.p3f4de270} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group21() {
  return (
    <div className="absolute bottom-[15.91%] left-[83.34%] right-[2.75%] top-1/2" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 79 75">
        <g id="Group">
          <path d={svgPaths.p13605100} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group22() {
  return (
    <div className="absolute contents inset-[2.27%_2.75%_15.91%_13.2%]" data-name="Group">
      <Group17 />
      <Group18 />
      <Group19 />
      <Group20 />
      <Group21 />
    </div>
  );
}

function Group23() {
  return (
    <div className="absolute contents inset-[2.27%_2.75%_15.91%_13.2%]" data-name="Group">
      <Group22 />
    </div>
  );
}

function RechartsBarR() {
  return (
    <div className="absolute contents inset-[2.27%_2.75%_15.91%_13.2%]" data-name="recharts-bar-:r15:">
      <Group23 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="absolute h-[220px] left-0 overflow-clip top-0 w-[568px]" data-name="Icon">
      <Group2 />
      <Group9 />
      <Group16 />
      <RechartsBarR />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute h-[220px] left-[21px] top-[98px] w-[568px]" data-name="Container">
      <Icon8 />
    </div>
  );
}

function Card4() {
  return (
    <div className="[grid-area:1_/_1] bg-white relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <InsightsView16 />
      <Container6 />
    </div>
  );
}

function InsightsView17() {
  return (
    <div className="absolute h-[27px] left-[21px] top-[21px] w-[568px]" data-name="InsightsView">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[27px] left-0 text-[18px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">Weekly Study Hours</p>
    </div>
  );
}

function Group24() {
  return (
    <div className="absolute inset-[2.27%_0.88%_15.91%_11.44%]" data-name="Group">
      <div className="absolute bottom-[-0.28%] left-0 right-0 top-[-0.28%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 498 181">
          <g id="Group">
            <path d="M0 180.5H498" id="Vector" stroke="var(--stroke-0, black)" strokeDasharray="3 3" />
            <path d="M0 135.5H498" id="Vector_2" stroke="var(--stroke-0, black)" strokeDasharray="3 3" />
            <path d="M0 90.5H498" id="Vector_3" stroke="var(--stroke-0, black)" strokeDasharray="3 3" />
            <path d="M0 45.5H498" id="Vector_4" stroke="var(--stroke-0, black)" strokeDasharray="3 3" />
            <path d="M0 0.5H498" id="Vector_5" stroke="var(--stroke-0, black)" strokeDasharray="3 3" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group25() {
  return (
    <div className="absolute inset-[2.27%_0.88%_15.91%_11.44%]" data-name="Group">
      <div className="absolute bottom-0 left-[-0.1%] right-[-0.1%] top-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 499 180">
          <g id="Group">
            <path d="M0.5 0V180" id="Vector" stroke="var(--stroke-0, black)" strokeDasharray="3 3" />
            <path d="M83.5 0V180" id="Vector_2" stroke="var(--stroke-0, black)" strokeDasharray="3 3" />
            <path d="M166.5 0V180" id="Vector_3" stroke="var(--stroke-0, black)" strokeDasharray="3 3" />
            <path d="M249.5 0V180" id="Vector_4" stroke="var(--stroke-0, black)" strokeDasharray="3 3" />
            <path d="M332.5 0V180" id="Vector_5" stroke="var(--stroke-0, black)" strokeDasharray="3 3" />
            <path d="M415.5 0V180" id="Vector_6" stroke="var(--stroke-0, black)" strokeDasharray="3 3" />
            <path d="M498.5 0V180" id="Vector_7" stroke="var(--stroke-0, black)" strokeDasharray="3 3" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group26() {
  return (
    <div className="absolute contents inset-[2.27%_0.88%_15.91%_11.44%]" data-name="Group">
      <Group24 />
      <Group25 />
    </div>
  );
}

function Group27() {
  return (
    <div className="absolute contents inset-[84.09%_86.36%_7.04%_9.24%]" data-name="Group">
      <div className="absolute inset-[84.09%_88.56%_13.18%_11.44%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[86.14%_86.36%_7.04%_9.24%] leading-[normal] not-italic text-[12px] text-black text-center text-nowrap whitespace-pre">Mon</p>
    </div>
  );
}

function Group28() {
  return (
    <div className="absolute contents inset-[84.09%_72.09%_7.04%_24.21%]" data-name="Group">
      <div className="absolute inset-[84.09%_73.94%_13.18%_26.06%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[86.14%_72.09%_7.04%_24.21%] leading-[normal] not-italic text-[12px] text-black text-center text-nowrap whitespace-pre">Tue</p>
    </div>
  );
}

function Group29() {
  return (
    <div className="absolute contents inset-[84.09%_57.04%_7.04%_38.38%]" data-name="Group">
      <div className="absolute inset-[84.09%_59.33%_13.18%_40.67%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[86.14%_57.04%_7.04%_38.38%] leading-[normal] not-italic text-[12px] text-black text-center text-nowrap whitespace-pre">Wed</p>
    </div>
  );
}

function Group30() {
  return (
    <div className="absolute contents inset-[84.09%_42.78%_7.04%_53.34%]" data-name="Group">
      <div className="absolute inset-[84.09%_44.72%_13.18%_55.28%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[86.14%_42.78%_7.04%_53.34%] leading-[normal] not-italic text-[12px] text-black text-center text-nowrap whitespace-pre">Thu</p>
    </div>
  );
}

function Group31() {
  return (
    <div className="absolute contents inset-[84.09%_28.79%_7.04%_68.57%]" data-name="Group">
      <div className="absolute inset-[84.09%_30.11%_13.18%_69.89%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[86.14%_28.79%_7.04%_68.57%] leading-[normal] not-italic text-[12px] text-black text-center text-nowrap whitespace-pre">Fri</p>
    </div>
  );
}

function Group32() {
  return (
    <div className="absolute contents inset-[84.09%_13.82%_7.04%_82.83%]" data-name="Group">
      <div className="absolute inset-[84.09%_15.49%_13.18%_84.51%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[86.14%_13.82%_7.04%_82.83%] leading-[normal] not-italic text-[12px] text-black text-center text-nowrap whitespace-pre">Sat</p>
    </div>
  );
}

function Group33() {
  return (
    <div className="absolute contents inset-[84.09%_0.41%_7.04%_95.72%]" data-name="Group">
      <div className="absolute inset-[84.09%_0.88%_13.18%_99.12%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[86.14%_0.41%_7.04%_95.72%] leading-[normal] not-italic text-[12px] text-black text-center text-nowrap whitespace-pre">Sun</p>
    </div>
  );
}

function Group34() {
  return (
    <div className="absolute contents inset-[84.09%_0.41%_7.04%_9.24%]" data-name="Group">
      <Group27 />
      <Group28 />
      <Group29 />
      <Group30 />
      <Group31 />
      <Group32 />
      <Group33 />
    </div>
  );
}

function Group35() {
  return (
    <div className="absolute contents inset-[84.09%_0.41%_7.04%_9.24%]" data-name="Group">
      <div className="absolute inset-[84.09%_0.88%_15.91%_11.44%]" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 498 1">
            <path d="M0 0.5H498" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <Group34 />
    </div>
  );
}

function Group36() {
  return (
    <div className="absolute contents inset-[80.57%_88.56%_12.61%_8.63%]" data-name="Group">
      <div className="absolute inset-[84.09%_88.56%_15.91%_10.39%]" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 1">
            <path d="M0 0.5H6" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[80.57%_89.97%_12.61%_8.63%] leading-[normal] not-italic text-[12px] text-black text-nowrap text-right whitespace-pre">0</p>
    </div>
  );
}

function Group37() {
  return (
    <div className="absolute contents inset-[60.12%_88.56%_33.06%_8.98%]" data-name="Group">
      <div className="absolute inset-[63.64%_88.56%_36.36%_10.39%]" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 1">
            <path d="M0 0.5H6" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[60.12%_89.97%_33.06%_8.98%] leading-[normal] not-italic text-[12px] text-black text-nowrap text-right whitespace-pre">1</p>
    </div>
  );
}

function Group38() {
  return (
    <div className="absolute contents inset-[39.66%_88.56%_53.52%_8.63%]" data-name="Group">
      <div className="absolute inset-[43.18%_88.56%_56.82%_10.39%]" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 1">
            <path d="M0 0.5H6" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[39.66%_89.97%_53.52%_8.63%] leading-[normal] not-italic text-[12px] text-black text-nowrap text-right whitespace-pre">2</p>
    </div>
  );
}

function Group39() {
  return (
    <div className="absolute contents inset-[19.21%_88.56%_73.97%_8.63%]" data-name="Group">
      <div className="absolute inset-[22.73%_88.56%_77.27%_10.39%]" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 1">
            <path d="M0 0.5H6" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[19.21%_89.97%_73.97%_8.63%] leading-[normal] not-italic text-[12px] text-black text-nowrap text-right whitespace-pre">3</p>
    </div>
  );
}

function Group40() {
  return (
    <div className="absolute contents inset-[1.94%_88.56%_91.25%_8.63%]" data-name="Group">
      <div className="absolute inset-[2.27%_88.56%_97.73%_10.39%]" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 1">
            <path d="M0 0.5H6" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[1.94%_89.97%_91.25%_8.63%] leading-[normal] not-italic text-[12px] text-black text-nowrap text-right whitespace-pre">4</p>
    </div>
  );
}

function Group41() {
  return (
    <div className="absolute contents inset-[1.94%_88.56%_12.61%_8.63%]" data-name="Group">
      <Group36 />
      <Group37 />
      <Group38 />
      <Group39 />
      <Group40 />
    </div>
  );
}

function Group42() {
  return (
    <div className="absolute contents inset-[1.94%_88.56%_12.61%_8.63%]" data-name="Group">
      <div className="absolute inset-[2.27%_88.56%_15.91%_11.44%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 180">
            <path d="M0.5 0V180" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <Group41 />
    </div>
  );
}

function Group43() {
  return (
    <div className="absolute inset-[0.46%_0.18%_44.77%_10.74%]" data-name="Group">
      <div className="absolute inset-[-0.83%_-0.2%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 508 123">
          <g id="Group">
            <path d={svgPaths.p24796f00} id="recharts-line-:r16:" stroke="var(--stroke-0, black)" strokeWidth="2" />
            <g id="Group_2">
              <path d={svgPaths.p2492dd80} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" strokeWidth="2" />
              <path d={svgPaths.p1fea0e00} fill="var(--fill-0, black)" id="Vector_2" stroke="var(--stroke-0, black)" strokeWidth="2" />
              <path d={svgPaths.p355a300} fill="var(--fill-0, black)" id="Vector_3" stroke="var(--stroke-0, black)" strokeWidth="2" />
              <path d={svgPaths.p371b0d80} fill="var(--fill-0, black)" id="Vector_4" stroke="var(--stroke-0, black)" strokeWidth="2" />
              <path d={svgPaths.p2a041300} fill="var(--fill-0, black)" id="Vector_5" stroke="var(--stroke-0, black)" strokeWidth="2" />
              <path d={svgPaths.p3ed83e80} fill="var(--fill-0, black)" id="Vector_6" stroke="var(--stroke-0, black)" strokeWidth="2" />
              <path d={svgPaths.p3388db80} fill="var(--fill-0, black)" id="Vector_7" stroke="var(--stroke-0, black)" strokeWidth="2" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="absolute h-[220px] left-0 overflow-clip top-0 w-[568px]" data-name="Icon">
      <Group26 />
      <Group35 />
      <Group42 />
      <Group43 />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute h-[220px] left-[21px] top-[98px] w-[568px]" data-name="Container">
      <Icon9 />
    </div>
  );
}

function Card5() {
  return (
    <div className="[grid-area:1_/_2] bg-white relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <InsightsView17 />
      <Container7 />
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute gap-[20px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[339px] left-[185.5px] top-[465px] w-[1240px]" data-name="Container">
      <Card4 />
      <Card5 />
    </div>
  );
}

function InsightsView18() {
  return (
    <div className="h-[24px] relative shrink-0 w-[778px]" data-name="InsightsView">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[778px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">Flashcard Accuracy by Course</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="bg-amber-600 relative rounded-[6px] shrink-0 size-[12px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[12px]" />
    </div>
  );
}

function Text() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-start relative w-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-neutral-950 text-nowrap whitespace-pre">CS 101</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[20px] relative shrink-0 w-[64.594px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[10px] h-[20px] items-center relative w-[64.594px]">
        <Container9 />
        <Text />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[44px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[44px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal h-[38px] leading-[20px] left-[16.5px] text-[#717182] text-[14px] top-0 w-[33px]">85%</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <Text1 />
    </div>
  );
}

function Container12() {
  return <div className="bg-[#fe9a00] h-[6px] rounded-[3.35544e+07px] shrink-0 w-full" data-name="Container" />;
}

function Container13() {
  return (
    <div className="bg-[rgba(227,127,10,0.13)] h-[6px] relative rounded-[3.35544e+07px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col h-[6px] items-start pl-0 pr-[116.703px] py-0 relative w-full">
          <Container12 />
        </div>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Container">
      <Container11 />
      <Container13 />
    </div>
  );
}

function Container15() {
  return (
    <div className="bg-emerald-600 relative rounded-[6px] shrink-0 size-[12px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[12px]" />
    </div>
  );
}

function Text2() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-start relative w-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-neutral-950 text-nowrap whitespace-pre">MATH 201</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[20px] relative shrink-0 w-[86.359px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[10px] h-[20px] items-center relative w-[86.359px]">
        <Container15 />
        <Text2 />
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[26.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[26.563px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal h-[38px] leading-[20px] left-[-3.94px] text-[#717182] text-[14px] top-0 w-[31px]">92%</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container16 />
      <Text3 />
    </div>
  );
}

function Container18() {
  return <div className="bg-[#009689] h-[6px] rounded-[3.35544e+07px] shrink-0 w-full" data-name="Container" />;
}

function Container19() {
  return (
    <div className="bg-[rgba(5,150,105,0.13)] h-[6px] relative rounded-[3.35544e+07px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col h-[6px] items-start pl-0 pr-[62.25px] py-0 relative w-full">
          <Container18 />
        </div>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Container">
      <Container17 />
      <Container19 />
    </div>
  );
}

function InsightsView19() {
  return (
    <div className="h-[173px] relative shrink-0 w-[778px]" data-name="InsightsView">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[15px] h-[173px] items-start relative w-[778px]">
        <Container14 />
        <Container20 />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">Study Activity Distribution</p>
    </div>
  );
}

function Group44() {
  return (
    <div className="absolute bottom-1/2 left-[42.15%] right-[32.85%] top-[9.38%]" data-name="Group">
      <div className="absolute inset-[-0.77%_-0.53%_-0.77%_-0.71%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 96 66">
          <g id="Group">
            <path d={svgPaths.p3490d580} fill="var(--fill-0, #D97706)" id="Vector" stroke="var(--stroke-0, white)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group45() {
  return (
    <div className="absolute inset-[15.64%_56.34%_32.19%_32.85%]" data-name="Group">
      <div className="absolute inset-[-0.83%_-1.68%_-0.8%_-1.22%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 43 85">
          <g id="Group">
            <path d={svgPaths.p3a095800} fill="var(--fill-0, #059669)" id="Vector" stroke="var(--stroke-0, white)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group46() {
  return (
    <div className="absolute inset-[64.48%_47.61%_9.38%_35.3%]" data-name="Group">
      <div className="absolute inset-[-1.64%_-0.87%_-1.2%_-1.06%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 67 43">
          <g id="Group">
            <path d={svgPaths.p3d735b00} fill="var(--fill-0, #2563EB)" id="Vector" stroke="var(--stroke-0, white)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group47() {
  return (
    <div className="absolute inset-[62.66%_34.69%_10.42%_52.67%]" data-name="Group">
      <div className="absolute inset-[-1.56%_-1.4%_-1.39%_-1.25%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 45">
          <g id="Group">
            <path d={svgPaths.pabe7bb0} fill="var(--fill-0, #C084FC)" id="Vector" stroke="var(--stroke-0, white)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group48() {
  return (
    <div className="absolute inset-[52.45%_32.91%_34.95%_61.03%]" data-name="Group">
      <div className="absolute inset-[-2.69%_-2.36%_-3.22%_-2.83%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 22">
          <g id="Group">
            <path d={svgPaths.p2e4ae200} fill="var(--fill-0, #EAB308)" id="Vector" stroke="var(--stroke-0, white)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group49() {
  return (
    <div className="absolute contents inset-[9.38%_32.85%]" data-name="Group">
      <Group44 />
      <Group45 />
      <Group46 />
      <Group47 />
      <Group48 />
    </div>
  );
}

function Group50() {
  return (
    <div className="absolute contents inset-[9.38%_32.85%]" data-name="Group">
      <Group49 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="absolute h-[160px] left-0 overflow-clip top-0 w-[379px]" data-name="Icon">
      <Group50 />
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute h-[160px] left-0 top-[16px] w-[379px]" data-name="Container">
      <Icon10 />
    </div>
  );
}

function Container22() {
  return (
    <div className="bg-amber-600 relative rounded-[6px] shrink-0 size-[12px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[12px]" />
    </div>
  );
}

function Text4() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] text-neutral-950 text-nowrap whitespace-pre">Flashcards</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[16px] relative shrink-0 w-[76.734px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[10px] h-[16px] items-center relative w-[76.734px]">
        <Container22 />
        <Text4 />
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[16px] relative shrink-0 w-[22.766px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[22.766px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal h-[31px] leading-[16px] left-[-3.73px] text-[12px] text-neutral-950 top-0 w-[27px]">35%</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[32px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[32px] items-center justify-between px-[8px] py-0 relative w-full">
          <Container23 />
          <Text5 />
        </div>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="bg-emerald-600 relative rounded-[6px] shrink-0 size-[12px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[12px]" />
    </div>
  );
}

function Text6() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] text-neutral-950 text-nowrap whitespace-pre">Reading</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[16px] relative shrink-0 w-[65.047px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[10px] h-[16px] items-center relative w-[65.047px]">
        <Container25 />
        <Text6 />
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[16px] relative shrink-0 w-[22.766px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[22.766px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal h-[31px] leading-[16px] left-[-2.73px] text-[12px] text-neutral-950 top-0 w-[26px]">25%</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[32px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[32px] items-center justify-between px-[8px] py-0 relative w-full">
          <Container26 />
          <Text7 />
        </div>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="bg-blue-600 relative rounded-[6px] shrink-0 size-[12px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[12px]" />
    </div>
  );
}

function Text8() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] text-neutral-950 text-nowrap whitespace-pre">Assignments</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="h-[16px] relative shrink-0 w-[89.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[10px] h-[16px] items-center relative w-[89.25px]">
        <Container28 />
        <Text8 />
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[16px] relative shrink-0 w-[22.766px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[22.766px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal h-[31px] leading-[16px] left-[-2.73px] text-[12px] text-neutral-950 top-0 w-[26px]">20%</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="h-[32px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[32px] items-center justify-between px-[8px] py-0 relative w-full">
          <Container29 />
          <Text9 />
        </div>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="bg-purple-400 relative rounded-[6px] shrink-0 size-[12px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[12px]" />
    </div>
  );
}

function Text10() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] text-neutral-950 text-nowrap whitespace-pre">Practice Quizzes</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[16px] relative shrink-0 w-[107.594px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[10px] h-[16px] items-center relative w-[107.594px]">
        <Container31 />
        <Text10 />
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[16px] relative shrink-0 w-[22.766px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[22.766px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal h-[31px] leading-[16px] left-[-2.73px] text-[12px] text-neutral-950 top-0 w-[26px]">15%</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[32px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[32px] items-center justify-between px-[8px] py-0 relative w-full">
          <Container32 />
          <Text11 />
        </div>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="bg-yellow-500 relative rounded-[6px] shrink-0 size-[12px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[12px]" />
    </div>
  );
}

function Text12() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] text-neutral-950 text-nowrap whitespace-pre">Videos</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[16px] relative shrink-0 w-[57.828px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[10px] h-[16px] items-center relative w-[57.828px]">
        <Container34 />
        <Text12 />
      </div>
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[16px] relative shrink-0 w-[16.297px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[16.297px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal h-[31px] leading-[16px] left-[-3.2px] text-[12px] text-neutral-950 top-0 w-[20px]">5%</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[32px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[32px] items-center justify-between px-[8px] py-0 relative w-full">
          <Container35 />
          <Text13 />
        </div>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[192px] items-start left-[399px] top-0 w-[379px]" data-name="Container">
      <Container24 />
      <Container27 />
      <Container30 />
      <Container33 />
      <Container36 />
    </div>
  );
}

function Container38() {
  return (
    <div className="h-[192px] relative shrink-0 w-full" data-name="Container">
      <Container21 />
      <Container37 />
    </div>
  );
}

function InsightsView20() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[778px]" data-name="InsightsView">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[20px] h-full items-start relative w-[778px]">
        <Heading1 />
        <Container38 />
      </div>
    </div>
  );
}

function Card6() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[50px] h-[579px] items-start left-0 pl-[21px] pr-px py-[21px] rounded-[14px] top-0 w-[820px]" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <InsightsView18 />
      <InsightsView19 />
      <InsightsView20 />
    </div>
  );
}

function InsightsView21() {
  return (
    <div className="h-[24px] relative shrink-0 w-[358px]" data-name="InsightsView">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[358px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">Achievements</p>
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p160f0600} id="Vector" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p27180a80} id="Vector_2" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container39() {
  return (
    <div className="bg-[rgba(3,2,19,0.1)] relative rounded-[10px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon11 />
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Heading 4">
      <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[14px] text-neutral-950">Week Warrior</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px relative shrink-0 text-[#717182] text-[12px]">Studied 7 days in a row</p>
    </div>
  );
}

function Container40() {
  return (
    <div className="basis-0 grow h-[38px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[2px] h-[38px] items-start relative w-full">
        <Heading2 />
        <Paragraph1 />
      </div>
    </div>
  );
}

function Badge4() {
  return (
    <div className="h-[22px] relative rounded-[8px] shrink-0 w-[27px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[22px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[27px]">
        <p className="font-['Arimo:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] text-neutral-950 text-nowrap whitespace-pre">✓</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex gap-[10px] h-[38px] items-start relative shrink-0 w-full" data-name="Container">
      <Container39 />
      <Container40 />
      <Badge4 />
    </div>
  );
}

function Container42() {
  return (
    <div className="bg-[rgba(3,2,19,0.05)] h-[64px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(3,2,19,0.5)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[64px] items-start pb-px pt-[13px] px-[13px] relative w-full">
          <Container41 />
        </div>
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_6087)" id="Icon">
          <path d="M8 12V3.33333" id="Vector" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3b97c700} id="Vector_2" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3fbf6000} id="Vector_3" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p721500} id="Vector_4" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p24a41580} id="Vector_5" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3b97d180} id="Vector_6" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p375b55c0} id="Vector_7" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2e809100} id="Vector_8" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_1_6087">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container43() {
  return (
    <div className="bg-[rgba(3,2,19,0.1)] relative rounded-[10px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon12 />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Heading 4">
      <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[14px] text-neutral-950">Flashcard Master</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px relative shrink-0 text-[#717182] text-[12px]">Reviewed 500+ flashcards</p>
    </div>
  );
}

function Container44() {
  return (
    <div className="basis-0 grow h-[38px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[2px] h-[38px] items-start relative w-full">
        <Heading3 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Badge5() {
  return (
    <div className="h-[22px] relative rounded-[8px] shrink-0 w-[27px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[22px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[27px]">
        <p className="font-['Arimo:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] text-neutral-950 text-nowrap whitespace-pre">✓</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex gap-[10px] h-[38px] items-start relative shrink-0 w-full" data-name="Container">
      <Container43 />
      <Container44 />
      <Badge5 />
    </div>
  );
}

function Container46() {
  return (
    <div className="bg-[rgba(3,2,19,0.05)] h-[64px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(3,2,19,0.5)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[64px] items-start pb-px pt-[13px] px-[13px] relative w-full">
          <Container45 />
        </div>
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_7388)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p245eb100} id="Vector_2" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p18635ff0} id="Vector_3" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_1_7388">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container47() {
  return (
    <div className="bg-[#ececf0] relative rounded-[10px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon13 />
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Heading 4">
      <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[14px] text-neutral-950">Perfect Score</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px relative shrink-0 text-[#717182] text-[12px]">Get 100% on a practice quiz</p>
    </div>
  );
}

function Container48() {
  return (
    <div className="basis-0 grow h-[38px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[2px] h-[38px] items-start relative w-full">
        <Heading4 />
        <Paragraph3 />
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex gap-[10px] h-[38px] items-start relative shrink-0 w-full" data-name="Container">
      <Container47 />
      <Container48 />
    </div>
  );
}

function Container50() {
  return (
    <div className="bg-[rgba(236,236,240,0.3)] h-[64px] opacity-60 relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[64px] items-start pb-px pt-[13px] px-[13px] relative w-full">
          <Container49 />
        </div>
      </div>
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M8 4.66667V14" id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p8c8fb00} id="Vector_2" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container51() {
  return (
    <div className="bg-[#ececf0] relative rounded-[10px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon14 />
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Heading 4">
      <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[14px] text-neutral-950">Early Bird</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px relative shrink-0 text-[#717182] text-[12px]">Complete all assignments 2 days early</p>
    </div>
  );
}

function Container52() {
  return (
    <div className="basis-0 grow h-[38px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[2px] h-[38px] items-start relative w-full">
        <Heading5 />
        <Paragraph4 />
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex gap-[10px] h-[38px] items-start relative shrink-0 w-full" data-name="Container">
      <Container51 />
      <Container52 />
    </div>
  );
}

function Container54() {
  return (
    <div className="bg-[rgba(236,236,240,0.3)] h-[64px] opacity-60 relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[64px] items-start pb-px pt-[13px] px-[13px] relative w-full">
          <Container53 />
        </div>
      </div>
    </div>
  );
}

function InsightsView22() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[358px]" data-name="InsightsView">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-full items-start relative w-[358px]">
        <Container42 />
        <Container46 />
        <Container50 />
        <Container54 />
      </div>
    </div>
  );
}

function Card7() {
  return (
    <div className="bg-white h-[388px] relative rounded-[14px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[42px] h-[388px] items-start pl-[21px] pr-px py-[21px] relative w-full">
          <InsightsView21 />
          <InsightsView22 />
        </div>
      </div>
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_6087)" id="Icon">
          <path d="M8 12V3.33333" id="Vector" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3b97c700} id="Vector_2" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3fbf6000} id="Vector_3" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p721500} id="Vector_4" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p24a41580} id="Vector_5" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3b97d180} id="Vector_6" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p375b55c0} id="Vector_7" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2e809100} id="Vector_8" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_1_6087">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Heading6() {
  return (
    <div className="h-[24px] relative shrink-0 w-[98.672px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[98.672px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">Study Insights</p>
      </div>
    </div>
  );
}

function InsightsView23() {
  return (
    <div className="h-[24px] relative shrink-0 w-[358px]" data-name="InsightsView">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[10px] h-[24px] items-center relative w-[358px]">
        <Icon15 />
        <Heading6 />
      </div>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px relative shrink-0 text-[12px] text-neutral-950">Study sessions most productive 2-4 PM</p>
    </div>
  );
}

function Container55() {
  return (
    <div className="bg-[rgba(3,2,19,0.05)] h-[34px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(3,2,19,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[34px] items-start pb-px pt-[9px] px-[9px] relative w-full">
          <Paragraph5 />
        </div>
      </div>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px relative shrink-0 text-[12px] text-neutral-950">Flashcard accuracy +15% this month</p>
    </div>
  );
}

function Container56() {
  return (
    <div className="bg-[rgba(3,2,19,0.05)] h-[34px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(3,2,19,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[34px] items-start pb-px pt-[9px] px-[9px] relative w-full">
          <Paragraph6 />
        </div>
      </div>
    </div>
  );
}

function InsightsView24() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[358px]" data-name="InsightsView">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-full items-start relative w-[358px]">
        <Container55 />
        <Container56 />
      </div>
    </div>
  );
}

function Card8() {
  return (
    <div className="bg-white h-[184px] relative rounded-[14px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[42px] h-[184px] items-start pl-[21px] pr-px py-[21px] relative w-full">
          <InsightsView23 />
          <InsightsView24 />
        </div>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] h-[592px] items-start left-[840px] top-0 w-[400px]" data-name="Container">
      <Card7 />
      <Card8 />
    </div>
  );
}

function Container58() {
  return (
    <div className="absolute h-[592px] left-[185.5px] top-[834px] w-[1240px]" data-name="Container">
      <Card6 />
      <Container57 />
    </div>
  );
}

export default function InsightsView25() {
  return (
    <div className="bg-white relative size-full" data-name="InsightsView">
      <Container />
      <Container5 />
      <Container8 />
      <Container58 />
    </div>
  );
}