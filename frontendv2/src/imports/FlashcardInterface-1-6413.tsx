import svgPaths from "./svg-lf8pijpzil";

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
    <div className="absolute h-[36px] left-0 rounded-[8px] top-0 w-[166.719px]" data-name="Button">
      <Icon />
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[46px] text-[14px] text-neutral-950 text-nowrap top-[6px] whitespace-pre">Back to Selection</p>
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
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#717182] text-[14px] text-nowrap whitespace-pre">CS 101 - Introduction to Computer Science</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[44px] relative shrink-0 w-[265.016px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[44px] items-start relative w-[265.016px]">
        <Heading />
        <Paragraph />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex gap-[15px] h-[48px] items-center left-0 top-[56px] w-[856px]" data-name="Container">
      <Container />
      <Container1 />
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[104px] relative shrink-0 w-full" data-name="Container">
      <Button />
      <Container2 />
    </div>
  );
}

function PrimitiveButton() {
  return (
    <div className="basis-0 grow h-[29px] min-h-px min-w-px relative rounded-[14px] shrink-0" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6px] h-[29px] items-center justify-center px-[9px] py-[5px] relative w-full">
          <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-neutral-950 text-nowrap whitespace-pre">Flashcards</p>
        </div>
      </div>
    </div>
  );
}

function PrimitiveButton1() {
  return (
    <div className="basis-0 bg-white grow h-[29px] min-h-px min-w-px relative rounded-[14px] shrink-0" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6px] h-[29px] items-center justify-center px-[9px] py-[5px] relative w-full">
          <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-neutral-950 text-nowrap whitespace-pre">Practice Quiz</p>
        </div>
      </div>
    </div>
  );
}

function TabList() {
  return (
    <div className="bg-[#ececf0] h-[36px] relative rounded-[14px] shrink-0 w-[856px]" data-name="Tab List">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[36px] items-center justify-center relative w-[856px]">
        <PrimitiveButton />
        <PrimitiveButton1 />
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[20px] relative shrink-0 w-[95.203px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[95.203px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#717182] text-[14px] top-[-2px] w-[96px]">Question 1 of 1</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[92.828px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[92.828px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#717182] text-[14px] top-[-2px] w-[93px]">0 / 1 Answered</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text />
      <Text1 />
    </div>
  );
}

function PrimitiveDiv() {
  return <div className="bg-[#030213] h-[8px] rounded-[3.35544e+07px] shrink-0 w-full" data-name="Primitive.div" />;
}

function FlashcardInterface() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[36px] items-start relative shrink-0 w-full" data-name="FlashcardInterface">
      <Container4 />
      <PrimitiveDiv />
    </div>
  );
}

function Badge() {
  return (
    <div className="absolute bg-[#030213] h-[22px] left-0 rounded-[8px] top-[2px] w-[75.391px]" data-name="Badge">
      <div className="h-[22px] overflow-clip relative rounded-[inherit] w-[75.391px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-[9px] text-[12px] text-white top-[2px] w-[58px]">Question 1</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute h-[24px] left-0 top-[36px] w-[790px]" data-name="Heading 3">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">Which data structure uses LIFO (Last In, First Out)?</p>
    </div>
  );
}

function FlashcardInterface1() {
  return (
    <div className="h-[60px] relative shrink-0 w-[790px]" data-name="FlashcardInterface">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[60px] relative w-[790px]">
        <Badge />
        <Heading1 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="relative rounded-[3.35544e+07px] shrink-0 size-[24px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#717182] border-solid inset-0 pointer-events-none rounded-[3.35544e+07px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[24px]" />
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[24px] relative shrink-0 w-[46.906px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[46.906px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">Queue</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex gap-[15px] h-[24px] items-center left-[14px] top-[14px] w-[762px]" data-name="Container">
      <Container5 />
      <Text2 />
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[52px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container6 />
    </div>
  );
}

function Container7() {
  return (
    <div className="relative rounded-[3.35544e+07px] shrink-0 size-[24px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#717182] border-solid inset-0 pointer-events-none rounded-[3.35544e+07px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[24px]" />
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[24px] relative shrink-0 w-[36.891px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[36.891px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">Stack</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex gap-[15px] h-[24px] items-center left-[14px] top-[14px] w-[762px]" data-name="Container">
      <Container7 />
      <Text3 />
    </div>
  );
}

function Button2() {
  return (
    <div className="h-[52px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container8 />
    </div>
  );
}

function Container9() {
  return (
    <div className="relative rounded-[3.35544e+07px] shrink-0 size-[24px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#717182] border-solid inset-0 pointer-events-none rounded-[3.35544e+07px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[24px]" />
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[24px] relative shrink-0 w-[37.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[37.328px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">Array</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex gap-[15px] h-[24px] items-center left-[14px] top-[14px] w-[762px]" data-name="Container">
      <Container9 />
      <Text4 />
    </div>
  );
}

function Button3() {
  return (
    <div className="h-[52px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container10 />
    </div>
  );
}

function Container11() {
  return (
    <div className="relative rounded-[3.35544e+07px] shrink-0 size-[24px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#717182] border-solid inset-0 pointer-events-none rounded-[3.35544e+07px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[24px]" />
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[24px] relative shrink-0 w-[74.203px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[74.203px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">Linked List</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute content-stretch flex gap-[15px] h-[24px] items-center left-[14px] top-[14px] w-[762px]" data-name="Container">
      <Container11 />
      <Text5 />
    </div>
  );
}

function Button4() {
  return (
    <div className="h-[52px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container12 />
    </div>
  );
}

function FlashcardInterface2() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[790px]" data-name="FlashcardInterface">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-full items-start relative w-[790px]">
        <Button1 />
        <Button2 />
        <Button3 />
        <Button4 />
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="bg-white h-[408px] relative rounded-[14px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[50px] h-[408px] items-start pl-[33px] pr-px py-[33px] relative w-full">
          <FlashcardInterface1 />
          <FlashcardInterface2 />
        </div>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[13px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M10 12L6 8L10 4" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-white h-[36px] opacity-50 relative rounded-[8px] shrink-0 w-[114.016px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[114.016px]">
        <Icon2 />
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[47px] text-[14px] text-neutral-950 text-nowrap top-[6px] whitespace-pre">Previous</p>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[#030213] h-[36px] relative rounded-[8px] shrink-0 w-[110.109px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[10px] h-[36px] items-center justify-center px-[16px] py-[8px] relative w-[110.109px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre">Submit Quiz</p>
      </div>
    </div>
  );
}

function FlashcardInterface3() {
  return (
    <div className="content-stretch flex h-[36px] items-center justify-between relative shrink-0 w-full" data-name="FlashcardInterface">
      <Button5 />
      <Button6 />
    </div>
  );
}

function TabPanel() {
  return (
    <div className="h-[540px] relative shrink-0 w-[856px]" data-name="Tab Panel">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[30px] h-[540px] items-start relative w-[856px]">
        <FlashcardInterface />
        <Card />
        <FlashcardInterface3 />
      </div>
    </div>
  );
}

function PrimitiveDiv1() {
  return (
    <div className="content-stretch flex flex-col gap-[64px] items-start relative shrink-0 w-full" data-name="Primitive.div">
      <TabList />
      <TabPanel />
    </div>
  );
}

export default function FlashcardInterface4() {
  return (
    <div className="bg-white relative size-full" data-name="FlashcardInterface">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[30px] items-start pb-0 pt-[93px] px-[377.5px] relative size-full">
          <Container3 />
          <PrimitiveDiv1 />
        </div>
      </div>
    </div>
  );
}