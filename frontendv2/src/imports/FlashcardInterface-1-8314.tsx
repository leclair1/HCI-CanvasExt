import svgPaths from "./svg-le8kpk6ark";
import imgAiTutorLogo from "figma:asset/831d76f506f1dc02aaa78fa1316452543accee12.png";

function Icon() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p203476e0} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M12.6667 8H3.33333" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute h-[36px] left-0 rounded-[8px] top-0 w-[177.703px]" data-name="Button">
      <Icon />
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[46px] text-[14px] text-neutral-950 text-nowrap top-[6px] whitespace-pre">Back to Dashboard</p>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M12 18V5" id="Vector" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p11c39380} id="Vector_2" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p2e947480} id="Vector_3" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p3d7a0320} id="Vector_4" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p2c99ddc0} id="Vector_5" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p1d3ae070} id="Vector_6" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p157a9000} id="Vector_7" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p25258198} id="Vector_8" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-[rgba(3,2,19,0.1)] relative rounded-[10px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[48px]">
        <Icon1 />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">Smart Study Tools</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#717182] text-[14px] text-nowrap whitespace-pre">Select lessons to study</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[44px] relative shrink-0 w-[139.422px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[44px] items-start relative w-[139.422px]">
        <Heading />
        <Paragraph />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex gap-[15px] h-[48px] items-center left-0 top-[55px] w-[856px]" data-name="Container">
      <Container />
      <Container1 />
    </div>
  );
}

function FlashcardInterface() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[150px]" data-name="FlashcardInterface">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[15px] h-full items-center relative w-[150px]">
        <div className="relative shrink-0 size-[25px]" data-name="AI tutor logo">
          <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid box-border inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgAiTutorLogo} />
          <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[25px]" />
        </div>
        <div className="h-[10.281px] relative shrink-0 w-[105.766px]" data-name="Union">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 106 11">
            <path d={svgPaths.p1272ac80} fill="var(--fill-0, #0A0A0A)" id="Union" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="absolute bg-gradient-to-r box-border content-stretch flex flex-col from-[rgba(3,2,19,0.05)] h-[48px] items-start left-[662px] pl-[20px] pr-px py-[21px] rounded-[14px] to-[rgba(0,150,137,0.05)] top-[55px] w-[194px]" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(3,2,19,0.2)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <FlashcardInterface />
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[104px] relative shrink-0 w-full" data-name="Container">
      <Button />
      <Container2 />
      <Card />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">CS 101 - Introduction to Computer Science</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[#717182] text-[14px]">All lessons selected</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[48px] relative shrink-0 w-[302.859px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[48px] items-start relative w-[302.859px]">
        <Heading1 />
        <Paragraph1 />
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[36px] relative rounded-[8px] shrink-0 w-[128.016px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[10px] h-[36px] items-center justify-center px-[16px] py-[8px] relative w-[128.016px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-neutral-950 text-nowrap whitespace-pre">Change Course</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex h-[48px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container4 />
      <Button1 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_6216)" id="Icon">
          <path d={svgPaths.p2061d800} id="Vector" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M16.6667 1.66667V5" id="Vector_2" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M18.3333 3.33333H15" id="Vector_3" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2661f400} id="Vector_4" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_1_6216">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[436.359px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-start relative w-[436.359px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-neutral-950 text-nowrap whitespace-pre">Select specific lessons or study all available flashcards from this course.</p>
      </div>
    </div>
  );
}

function FlashcardInterface1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[814px]" data-name="FlashcardInterface">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[15px] h-full items-center relative w-[814px]">
        <Icon2 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Card1() {
  return (
    <div className="bg-gradient-to-r from-[rgba(3,2,19,0.05)] h-[62px] relative rounded-[14px] shrink-0 to-[rgba(0,150,137,0.05)] w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(3,2,19,0.2)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[62px] items-start pl-[21px] pr-px py-[21px] relative w-full">
          <FlashcardInterface1 />
        </div>
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[24px] relative shrink-0 w-[101px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[101px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">Select Lessons</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white h-[32px] relative rounded-[8px] shrink-0 w-[84.359px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6px] h-[32px] items-center justify-center px-[13px] py-px relative w-[84.359px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-neutral-950 text-nowrap whitespace-pre">Select All</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex h-[32px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Button2 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p3de7e600} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveSpan() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-px size-[14px] top-px" data-name="Primitive.span">
      <Icon3 />
    </div>
  );
}

function PrimitiveButton() {
  return (
    <div className="absolute bg-[#030213] left-0 rounded-[4px] size-[16px] top-[7px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[#030213] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <PrimitiveSpan />
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M8 4.66667V14" id="Vector" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p8c8fb00} id="Vector_2" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[24px] relative shrink-0 w-[283.094px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[283.094px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">Module 1: Introduction to Programming</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex gap-[10px] h-[24px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon4 />
      <Heading3 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal h-[38px] leading-[20px] left-0 text-[#717182] text-[14px] top-0 w-[156px]">2 flashcards available</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[48px] items-start left-[36px] top-0 w-[778px]" data-name="Container">
      <Container7 />
      <Paragraph3 />
    </div>
  );
}

function FlashcardInterface2() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[814px]" data-name="FlashcardInterface">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full relative w-[814px]">
        <PrimitiveButton />
        <Container8 />
      </div>
    </div>
  );
}

function Card2() {
  return (
    <div className="bg-[rgba(3,2,19,0.05)] h-[90px] relative rounded-[14px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[#030213] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[90px] items-start pl-[21px] pr-px py-[21px] relative w-full">
          <FlashcardInterface2 />
        </div>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] h-[195px] items-start relative shrink-0 w-full" data-name="Container">
      <Card2 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-[247px] items-start relative shrink-0 w-full" data-name="Container">
      <Container6 />
      <Container9 />
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#030213] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[10px] h-[36px] items-center justify-center px-[16px] py-[8px] relative w-full">
          <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre">Start Studying (4 flashcards)</p>
        </div>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col gap-[30px] h-[499px] items-start relative shrink-0 w-full" data-name="Container">
      <Container5 />
      <Card1 />
      <Container10 />
      <Button3 />
    </div>
  );
}

export default function FlashcardInterface3() {
  return (
    <div className="bg-white relative size-full" data-name="FlashcardInterface">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[30px] items-start pb-0 pt-[93px] px-[387px] relative size-full">
          <Container3 />
          <Container11 />
        </div>
      </div>
    </div>
  );
}