import HomeHero from "./_component/HomeHero";

export const dynamic = 'force-dynamic'
export default function HomePage() {
  return (
    <div className="w-full lg:w-[1120px] md:mx-auto">
      <HomeHero/>
    </div>
  );
}
