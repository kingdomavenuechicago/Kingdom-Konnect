import { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

// ── SUPABASE CONFIG ──────────────────────────────────────────────────────────
const SUPABASE_URL = "https://xvxjlyntoynhhejdzrrk.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2eGpseW50b3luaGhlamR6cnJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyNTQwMjMsImV4cCI6MjA4ODgzMDAyM30.3l81ik7M2HzurFvTJUCm4DAPksUtEEJ73VwQv4foHnQ";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── BRAND ────────────────────────────────────────────────────────────────────
const B = "#6B1A2A";
const GOLD = "#C9A84C";
const CREAM = "#FDF8F0";
const DARK = "#1A0A0E";
const MUTED = "#9B7A82";
const SUCCESS = "#2D6A4F";
const WARN = "#C9A84C";
const DANGER = "#9B1C2E";
const LIGHT_B = "#F5EAEC";
const WHITE = "#FFFFFF";

// ── SEED DATA ─────────────────────────────────────────────────────────────────
const SEED_PARTNERS = [
  { id: "p_resident_association", orgName: "Resident Association (R.A.G.E.)", contactName: "", title: "Co-Founder & CEO", email: "info@ragenglewood.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: true, notes: "R.A.G.E. (Resident Association of Greater Englewood) - org confirmed" },
  { id: "p_familycentered", orgName: "Family Centered Services", contactName: "Drjmckenzie", title: "", email: "drjmckenzie@familycentered.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_uic", orgName: "University of Illinois Chicago (UIC)", contactName: "Gmorri", title: "", email: "gmorri4@uic.edu", phone: "", serviceCategories: ["Education Support"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_gechamber", orgName: "Greater Englewood Chamber of Commerce", contactName: "Fyoung", title: "", email: "fyoung@gechamber.com", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_family_focus", orgName: "Family Focus", contactName: "Trenetta Mclemore", title: "", email: "trenetta.mclemore@family-focus.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_cps", orgName: "Cps", contactName: "Awgarner", title: "", email: "awgarner@cps.edu", phone: "", serviceCategories: ["Education Support"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_teamwork_englewood", orgName: "Teamwork Englewood", contactName: "Ahazzard", title: "Education & Youth Services Program Manager", email: "ahazzard@teamworkenglewood.org", phone: "", serviceCategories: ["Education Support", "Workforce", "Youth Development"], capacity: "accepting", confirmed: true, notes: "Teamwork Englewood - org confirmed" },
  { id: "p_big_brothers_big_sis", orgName: "Big Brothers Big Sisters of Metropolitan Chicago", contactName: "Nunes", title: "Recruitment Specialist", email: "nunes@bbbschgo.org", phone: "", serviceCategories: ["Youth Development"], capacity: "accepting", confirmed: true, notes: "Casey Nunes - contact at Big Brothers Big Sisters of Metropolitan Chicago (listed for Barbershop Conversation events)" },
  { id: "p_city_year", orgName: "City Year", contactName: "Djefferies", title: "City Year contact (events/recruiting)", email: "djefferies@cityyear.org", phone: "", serviceCategories: ["Youth Development"], capacity: "accepting", confirmed: true, notes: "City Year - org confirmed" },
  { id: "p_mercy_housing", orgName: "Mercy Housing", contactName: "Econnor", title: "Philanthropy / Events Contact (Mercy Housing Lakefront)", email: "econnor@mercyhousing.org", phone: "", serviceCategories: ["Housing"], capacity: "accepting", confirmed: true, notes: "Found on Mercy Housing Lakefront pages (contact: econnor@mercyhousing.org). Source: mercyhousing.org" },
  { id: "p_after_school_matters", orgName: "After School Matters", contactName: "Erica Robinson", title: "Senior Program Manager (Gately Park)", email: "erica.robinson@afterschoolmatters.org", phone: "", serviceCategories: ["Education Support"], capacity: "accepting", confirmed: true, notes: "Erika/Erica Robinson - listed at After School Matters (program manager references)" },
  { id: "p_clocc", orgName: "CLOCC (Consortium to Lower Obesity in Chicago's Children)", contactName: "", title: "", email: "info@clocc.net", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_crushersclub", orgName: "Crushers Club", contactName: "", title: "", email: "info@crushersclub.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_growing_home,_inc.", orgName: "Growing Home, Inc.", contactName: "", title: "General Contact / Org", email: "info@growinghomeinc.org", phone: "", serviceCategories: ["Food & Nutrition"], capacity: "accepting", confirmed: true, notes: "Growing Home, Inc. - org confirmed" },
  { id: "p_gyrlsinthehood", orgName: "Gyrls in the Hood", contactName: "", title: "", email: "info@gyrlsinthehood.com", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_myneighborhoodheroes", orgName: "MyNeighborhoodHeroes (Neighborhood Heroes)", contactName: "", title: "General Contact / Org", email: "Info@myneighborhoodheroes.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: true, notes: "nan; title confirmed via web search" },
  { id: "p_thedovetailproject", orgName: "The Dovetail Project", contactName: "", title: "", email: "info@thedovetailproject.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_think_outside_da_blo", orgName: "Think Outside Da Block", contactName: "Iamphatal", title: "Founder & Executive Director", email: "iamphatal@thinkoutsidedablock.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: true, notes: "Pha'Tal Perkins - Think Outside Da Block (Founder/Executive Director)" },
  { id: "p_thisislifechi", orgName: "This Is Life Chicago", contactName: "", title: "", email: "info@thisislifechi.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_tutoring_chicago", orgName: "Tutoring Chicago", contactName: "", title: "Executive Director", email: "info@tutoringchicago.org", phone: "", serviceCategories: ["Education Support"], capacity: "accepting", confirmed: true, notes: "Tutoring Chicago - org confirmed" },
  { id: "p_vlacademy", orgName: "VL Academy", contactName: "", title: "", email: "info@vlacademy.org", phone: "", serviceCategories: ["Education Support"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_whole_kids_foundatio", orgName: "Whole Kids Foundation", contactName: "", title: "Leadership / Program Contacts (see leadership page)", email: "info@wholekidsfoundation.org", phone: "", serviceCategories: ["Youth Development"], capacity: "accepting", confirmed: true, notes: "Whole Kids Foundation - org confirmed" },
  { id: "p_lisc_(local_initiati", orgName: "LISC (Local Initiatives Support Corporation)", contactName: "Jament", title: "Org contact / staff directory available", email: "jament@lisc.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: true, notes: "LISC Chicago staff directory accessible; exact jament email not found on top results." },
  { id: "p_foundationscollegepr", orgName: "Foundations College Prep", contactName: "Kdiffay", title: "", email: "kdiffay@foundationscollegeprep.org", phone: "", serviceCategories: ["Education Support"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_heartland_alliance", orgName: "Heartland Alliance", contactName: "Kkelleghan", title: "", email: "kkelleghan@heartlandalliance.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_kdmengineering", orgName: "KDM Engineering", contactName: "Kmoore", title: "", email: "kmoore@kdmengineering.com", phone: "", serviceCategories: ["Workforce"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_metro_family", orgName: "Metro Family Services", contactName: "Guitronl", title: "", email: "guitronl@metrofamily.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_redclaydance", orgName: "Red Clay Dance", contactName: "Sara", title: "", email: "sara@redclaydance.com", phone: "", serviceCategories: ["Arts & Culture"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_sga_youth", orgName: "SGA Youth & Family Services", contactName: "Sdavis", title: "", email: "sdavis@sga-youth.org", phone: "", serviceCategories: ["Youth Development"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_greater_englewood_cd", orgName: "Greater Englewood CDC", contactName: "Soliphant", title: "", email: "soliphant@gecdc.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_fallsaccounting", orgName: "Falls Accounting", contactName: "Twartman", title: "", email: "twartman@fallsaccounting.com", phone: "", serviceCategories: ["Workforce"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_thearkofstsabina", orgName: "The Ark of St. Sabina", contactName: "Tbosley", title: "", email: "tbosley@thearkofstsabina.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_choice4kids", orgName: "Choice 4 Kids", contactName: "Trey", title: "", email: "trey@choice4kids.org", phone: "", serviceCategories: ["Youth Development"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_university_of_chicag", orgName: "University of Chicago / UChicago Consortium", contactName: "Vgutierrez", title: "Research Analyst II (UChicago Consortium)", email: "vgutierrez@uchicago.edu", phone: "", serviceCategories: ["Education Support"], capacity: "accepting", confirmed: true, notes: "Listed at UChicago Consortium staff directory. Source: uchicago.edu" },
  { id: "p_cydihs", orgName: "CYDIHS", contactName: "Aroyster", title: "", email: "aroyster@cydihs.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_cradles_to_crayons", orgName: "Cradles to Crayons", contactName: "Amartinez", title: "General Contact / Org", email: "amartinez@cradlestocrayons.org", phone: "", serviceCategories: ["Clothing & Supplies"], capacity: "accepting", confirmed: true, notes: "Cradles to Crayons - org confirmed" },
  { id: "p_newsnationnow", orgName: "NewsNation", contactName: "Atorres", title: "", email: "ATorres@newsnationnow.com", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_music_box_foundation", orgName: "Music Box Foundation", contactName: "Blloyd", title: "CEO (Music Box Foundation) - email unclear", email: "blloyd@musicboxfoundation.org", phone: "", serviceCategories: ["Arts & Culture"], capacity: "accepting", confirmed: true, notes: "Music Box Foundation staff/leadership listed; exact match for blloyd email not public. Source: musicboxfoundation.org" },
  { id: "p_obama_foundation", orgName: "Obama Foundation", contactName: "Ccrater", title: "Community Engagement Associate / My Brother's Keeper (Obama Foundation)", email: "ccrater@obama.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: true, notes: "Listed as Community Engagement Associate at Obama Foundation; contact references found on multiple pages." },
  { id: "p_burstintobooks", orgName: "Burst Into Books", contactName: "Jurema", title: "", email: "jurema@burstintobooks.org", phone: "", serviceCategories: ["Clothing & Supplies"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_projectvisionchicago", orgName: "Project Vision Chicago", contactName: "Karen", title: "", email: "karen@projectvisionchicago.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_growgreater", orgName: "Grow Greater Englewood", contactName: "Laseals", title: "", email: "LASEALS@growgreater.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_chicagocares", orgName: "Chicago Cares", contactName: "Lfunches", title: "", email: "lfunches@chicagocares.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_chicagocred", orgName: "Chicago CRED", contactName: "Michael Ivy", title: "", email: "michael.ivy@chicagocred.com", phone: "", serviceCategories: ["Violence Prevention"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_greaterchathaminitia", orgName: "Greater Chatham Initiative", contactName: "Nedra", title: "", email: "nedra@greaterchathaminitiative.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_equiticity", orgName: "Equiticity", contactName: "Oboi", title: "", email: "oboi@equiticity.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_ann_&_robert_h._luri", orgName: "Ann & Robert H. Lurie Children's Hospital", contactName: "Aioliver", title: "", email: "aioliver@luriechildrens.org", phone: "", serviceCategories: ["Medical", "Youth Development"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_chicago_ecohouse", orgName: "Chicago EcoHouse", contactName: "Qblackwell", title: "", email: "qblackwell@chicagoecohouse.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_north_river_commissi", orgName: "North River Commission", contactName: "Thomasapplegate", title: "", email: "thomasapplegate@northrivercommission.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_abj_chicago", orgName: "ABJ Community Services", contactName: "Victoriabrady", title: "", email: "victoriabrady@abjchicago.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_southside_help_cente", orgName: "Southside Help Center", contactName: "Vsmith", title: "", email: "vsmith@southsidehelp.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_cwap_chicago", orgName: "CWAP Chicago", contactName: "Velvian", title: "", email: "velvian@cwapchicago.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_caps,_inc.", orgName: "CAPS, Inc.", contactName: "Vrodgers", title: "", email: "vrodgers@capsinc.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_greater_auburn_gresh", orgName: "Greater Auburn Gresham Development Corporation (GAGDC)", contactName: "Ycintron", title: "", email: "ycintron@gagdc.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_pavingthewayproject", orgName: "Paving the Way Project", contactName: "Adavis", title: "", email: "adavis@pavingthewayproject.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_4us_youth_developmen", orgName: "4Us Youth Development", contactName: "Akelly", title: "", email: "akelly@4usyouthdevelopment.org", phone: "", serviceCategories: ["Youth Development"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_girls_who_code", orgName: "Girls Who Code", contactName: "Cicely Tatum Johnson", title: "", email: "cicely.tatum-johnson@girlswhocode.com", phone: "", serviceCategories: ["Youth Development"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_rpnfp", orgName: "RPN (Resource & Partnership Network)", contactName: "Dbates", title: "", email: "dbates@rpnfp.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_youth_guidance", orgName: "Youth Guidance", contactName: "Dezell", title: "", email: "dezell@youth-guidance.org", phone: "", serviceCategories: ["Youth Development", "Arts & Culture"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_thrivechicago", orgName: "Thrive Chicago", contactName: "Dadesida", title: "", email: "dadesida@thrivechi.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_mbmhmc", orgName: "Midwest BHMC", contactName: "Dboston", title: "", email: "Dboston@mbmhmc.com", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_district_outreach", orgName: "District Outreach", contactName: "Dori", title: "", email: "dori@district-outreach.com", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_namidupage", orgName: "NAMI DuPage", contactName: "E Coronel", title: "", email: "e.coronel@namidupage.org", phone: "", serviceCategories: ["Mental Health"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_fortyacresfreshmarke", orgName: "Forty Acres Fresh Market", contactName: "Liz", title: "", email: "liz@fortyacresfreshmarket.com", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_berniesbookbank", orgName: "Bernie's Book Bank", contactName: "Eblasko", title: "", email: "eblasko@berniesbookbank.org", phone: "", serviceCategories: ["Clothing & Supplies"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_themagnificentmile", orgName: "The Magnificent Mile Association", contactName: "Efarrar", title: "", email: "efarrar@themagnificentmile.com", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_fitcfoundation", orgName: "FITC Foundation", contactName: "", title: "", email: "info@fitcfoundation.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_northsidecr", orgName: "Northside Community Resources", contactName: "Gisele", title: "", email: "gisele@northsidecr.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_streetdreamzfoundati", orgName: "Street Dreamz Foundation", contactName: "", title: "", email: "INFO@streetdreamzfoundation.com", phone: "", serviceCategories: ["Violence Prevention"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_lightuplawndale", orgName: "Light Up Lawndale", contactName: "", title: "", email: "info@lightuplawndale.org", phone: "", serviceCategories: ["Legal"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_accionchicago", orgName: "Accion Chicago", contactName: "Ismoak", title: "", email: "ismoak@accionchicago.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_piggybacknetwork", orgName: "Piggyback Network", contactName: "Ish", title: "", email: "ish@piggybacknetwork.com", phone: "", serviceCategories: ["Workforce"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_lytecollective", orgName: "Lyte Collective", contactName: "Ismael", title: "", email: "ismael@lytecollective.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_target_area_developm", orgName: "Target Area Development Corporation", contactName: "Aphillips", title: "", email: "aphillips@targetarea.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_jccchicago", orgName: "JCC Chicago", contactName: "Eabrams", title: "", email: "eabrams@jccchicago.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_imagineenglewoodif", orgName: "Imagine Englewood If", contactName: "Heavy", title: "", email: "heavy@imagineenglewoodif.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_block_club_chicago", orgName: "Block Club Chicago", contactName: "", title: "", email: "newsroom@blockclubchi.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_ctu_iwp", orgName: "CTU / Innovative Workforce Program", contactName: "Uaguilar", title: "", email: "uaguilar@ctu-iwp.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_envision_community_s", orgName: "Envision Community Services", contactName: "Rmontejano", title: "", email: "rmontejano@envisioncs.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_build_chicago", orgName: "BUILD Chicago", contactName: "Bradlyjohnson", title: "", email: "bradlyjohnson@buildchicago.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_therootsinitiative", orgName: "The Roots Initiative", contactName: "Tanesha", title: "", email: "tanesha@therootsinitiative.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_chicagobooth", orgName: "University of Chicago Booth School", contactName: "Jayalajr", title: "", email: "jayalajr@chicagobooth.edu", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_csu", orgName: "Chicago State University", contactName: "Ale", title: "", email: "ale@csu.edu", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_povertycure", orgName: "Poverty Cure", contactName: "Amunkel", title: "", email: "amunkel@povertycure.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_collaboraction", orgName: "Collaboraction Theatre", contactName: "Anthony", title: "", email: "anthony@collaboraction.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_graymatterexperience", orgName: "Gray Matter Experience", contactName: "Britney", title: "", email: "britney@graymatterexperience.com", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_voail", orgName: "VOAIL", contactName: "Cevans", title: "", email: "CEvans@voail.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_macfound", orgName: "MacArthur Foundation", contactName: "Cjohnson", title: "", email: "cjohnson@macfound.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_savemoneysavelife", orgName: "Save Money Save Life", contactName: "Creative", title: "", email: "creative@savemoneysavelife.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_beehyyve", orgName: "Beehyyve", contactName: "Dlucas", title: "", email: "dlucas@beehyyve.com", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_stbh", orgName: "St. Bernard Hospital", contactName: "Dsinclair", title: "", email: "dsinclair@stbh.org", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_catholiccharities", orgName: "Catholic Charities", contactName: "Dshepard", title: "", email: "dshepard@catholiccharities.net", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_urbanprep", orgName: "Urban Prep Academies", contactName: "Jmason", title: "", email: "jmason@urbanprep.org", phone: "", serviceCategories: ["Education Support"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_communitylearningpar", orgName: "Community Learning Partnership", contactName: "Ken", title: "", email: "ken@communitylearningpartnership.org", phone: "", serviceCategories: ["Education Support", "Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_itavschools", orgName: "ITAV Schools", contactName: "Kristina", title: "", email: "kristina@itavschools.org", phone: "", serviceCategories: ["Education Support"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_chicago_park_distric", orgName: "Chicago Park District", contactName: "Maceo Johnson", title: "", email: "maceo.johnson@chicagoparkdistrict.com", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_coatangels", orgName: "Coat Angels", contactName: "Micki", title: "", email: "Micki@coatangels.com", phone: "", serviceCategories: ["Clothing & Supplies"], capacity: "accepting", confirmed: false, notes: "" },
  { id: "p_thehartford", orgName: "The Hartford (Insurance)", contactName: "Michael Marie", title: "", email: "Michael.Marie@thehartford.com", phone: "", serviceCategories: ["Community Building"], capacity: "accepting", confirmed: false, notes: "" },
];

const SEED_NAVIGATORS = [
  { id: "n1", name: "Deandra Gallardo", email: "dgallardo@kingdomavenuechicago.org", role: "navigator" },
  { id: "n2", name: "Antoinette Akins", email: "aakins@kingdomavenuechicago.org", role: "navigator" },
  { id: "n3", name: "Nekika Skinner", email: "nskinner@kingdomavenuechicago.org", role: "navigator" },
  { id: "n0", name: "Danielle Wallace", email: "kingdomavenuechicago@gmail.com", role: "admin" },
];

const FOLLOW_UP_INTERVALS = [
  { key: "72hr", label: "72 Hours", days: 3 },
  { key: "7d", label: "7 Days", days: 7 },
  { key: "14d", label: "14 Days", days: 14 },
  { key: "30d", label: "30 Days", days: 30 },
  { key: "60d", label: "60 Days", days: 60 },
  { key: "90d", label: "90 Days", days: 90 },
];

const NEED_CATEGORIES = ["Housing", "Food & Nutrition", "Mental Health", "Medical", "Legal", "Education Support", "Workforce", "Violence Prevention", "Youth Development", "Transportation", "Clothing & Supplies", "Other"];
const CPS_SCHOOLS = ["Robeson High School", "Harper High School", "Hope Academy", "CICS Ellison", "Englewood STEM High School", "Christian Fenger Academy", "Other CPS School"];

// ── SUPABASE HELPERS ──────────────────────────────────────────────────────────
async function load(key, fallback = null) {
  try {
    const { data, error } = await supabase.from("kk_data").select("value").eq("id", key).single();
    if (error || !data) return fallback;
    return data.value;
  } catch(e) { console.error("load error", e); return fallback; }
}
async function save(key, value) {
  try {
    console.log("💾 Saving to Supabase:", key);
    const { error } = await supabase.from("kk_data").upsert({ id: key, value, updated_at: new Date().toISOString() });
    if (error) console.error("❌ Supabase error:", error);
    else console.log("✅ Saved:", key);
  } catch(e) { console.error("❌ Save exception:", e); }
}
async function subscribeToKey(key, callback) {
  return supabase.channel("kk_" + key)
    .on("postgres_changes", { event: "*", schema: "public", table: "kk_data", filter: `id=eq.${key}` },
      (payload) => { if (payload.new?.value) callback(payload.new.value); })
    .subscribe();
}

function generateId() {
  return "kk_" + Date.now() + "_" + Math.random().toString(36).slice(2, 7);
}

function buildFollowUps(handoffDate) {
  const base = new Date(handoffDate);
  return FOLLOW_UP_INTERVALS.map(({ key, label, days }) => {
    const due = new Date(base);
    due.setDate(due.getDate() + days);
    return { key, label, dueDate: due.toISOString().split("T")[0], familyContacted: false, partnerContacted: false, completedDate: null, notes: "", outcome: "" };
  });
}

function daysUntil(dateStr) {
  if (!dateStr) return null;
  const diff = new Date(dateStr) - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// ── STYLES ────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: ${CREAM};
    color: ${DARK};
    min-height: 100vh;
  }

  .app { display: flex; min-height: 100vh; }

  /* SIDEBAR */
  .sidebar {
    width: 240px; min-width: 240px;
    background: ${B};
    display: flex; flex-direction: column;
    padding: 0;
    position: fixed; top: 0; left: 0; height: 100vh;
    z-index: 100;
  }
  .sidebar-logo {
    padding: 24px 20px 20px;
    border-bottom: 1px solid rgba(201,168,76,0.25);
  }
  .sidebar-logo h1 {
    font-family: 'Playfair Display', serif;
    font-size: 15px;
    font-weight: 900;
    color: ${GOLD};
    letter-spacing: 0.5px;
    line-height: 1.3;
  }
  .sidebar-logo p { font-size: 10px; color: rgba(255,255,255,0.45); margin-top: 3px; letter-spacing: 0.5px; }
  .sidebar-logo .kk-badge {
    display: inline-block;
    background: ${GOLD};
    color: ${B};
    font-size: 9px; font-weight: 700;
    padding: 2px 7px; border-radius: 20px;
    margin-top: 8px;
    letter-spacing: 0.8px;
    text-transform: uppercase;
  }

  .nav-section { padding: 16px 0 8px; }
  .nav-label { font-size: 9px; font-weight: 600; color: rgba(255,255,255,0.35); letter-spacing: 1.5px; text-transform: uppercase; padding: 0 20px 8px; }
  .nav-item {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 13px; font-weight: 500;
    color: rgba(255,255,255,0.65);
    transition: all 0.15s;
    border-left: 3px solid transparent;
    position: relative;
  }
  .nav-item:hover { background: rgba(255,255,255,0.06); color: white; }
  .nav-item.active { background: rgba(201,168,76,0.12); color: ${GOLD}; border-left-color: ${GOLD}; }
  .nav-item .nav-icon { font-size: 15px; width: 18px; text-align: center; }
  .nav-badge {
    margin-left: auto;
    background: ${DANGER};
    color: white;
    font-size: 10px; font-weight: 700;
    padding: 1px 6px; border-radius: 20px;
    min-width: 18px; text-align: center;
  }
  .nav-badge.warn { background: ${WARN}; color: ${B}; }

  .sidebar-footer {
    margin-top: auto;
    padding: 16px 20px;
    border-top: 1px solid rgba(255,255,255,0.08);
    font-size: 11px; color: rgba(255,255,255,0.3);
    line-height: 1.5;
  }

  /* MAIN */
  .main { margin-left: 240px; flex: 1; min-height: 100vh; }

  .topbar {
    background: white;
    border-bottom: 1px solid #EEE5E7;
    padding: 16px 32px;
    display: flex; align-items: center; gap: 16px;
    position: sticky; top: 0; z-index: 50;
  }
  .topbar h2 { font-family: 'Playfair Display', serif; font-size: 20px; color: ${B}; font-weight: 700; }
  .topbar-sub { font-size: 12px; color: ${MUTED}; margin-top: 1px; }
  .topbar-actions { margin-left: auto; display: flex; gap: 10px; }

  .page { padding: 28px 32px; }

  /* CARDS */
  .card {
    background: white;
    border: 1px solid #EEE5E7;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 1px 4px rgba(107,26,42,0.05);
  }
  .card-title { font-size: 13px; font-weight: 600; color: ${MUTED}; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 6px; }
  .card-value { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; color: ${B}; line-height: 1; }
  .card-value.gold { color: ${GOLD}; }
  .card-value.danger { color: ${DANGER}; }
  .card-value.success { color: ${SUCCESS}; }
  .card-sub { font-size: 11px; color: ${MUTED}; margin-top: 4px; }

  /* STAT GRID */
  .stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 24px; }

  /* BUTTONS */
  .btn {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 9px 18px;
    border-radius: 7px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 600;
    cursor: pointer; border: none;
    transition: all 0.15s;
    text-decoration: none;
  }
  .btn-primary { background: ${B}; color: white; }
  .btn-primary:hover { background: #541320; }
  .btn-gold { background: ${GOLD}; color: ${B}; }
  .btn-gold:hover { background: #B8952E; }
  .btn-outline { background: transparent; color: ${B}; border: 1.5px solid ${B}; }
  .btn-outline:hover { background: ${LIGHT_B}; }
  .btn-ghost { background: transparent; color: ${MUTED}; border: 1.5px solid #DDD; }
  .btn-ghost:hover { border-color: ${B}; color: ${B}; }
  .btn-danger { background: ${DANGER}; color: white; }
  .btn-sm { padding: 6px 13px; font-size: 12px; }
  .btn-xs { padding: 4px 10px; font-size: 11px; border-radius: 5px; }

  /* BADGES */
  .badge {
    display: inline-flex; align-items: center;
    padding: 3px 9px; border-radius: 20px;
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.3px;
  }
  .badge-new { background: #E8F4FD; color: #1565A0; }
  .badge-active { background: #E8F5E9; color: ${SUCCESS}; }
  .badge-overdue { background: #FDECEA; color: ${DANGER}; }
  .badge-complete { background: #F3F3F3; color: #666; }
  .badge-urgent { background: #FFF3E0; color: #E65100; }
  .badge-limited { background: #FFF8E1; color: #F57F17; }
  .badge-accepting { background: #E8F5E9; color: ${SUCCESS}; }

  /* FORM */
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .form-full { grid-column: 1 / -1; }
  .form-group { display: flex; flex-direction: column; gap: 6px; }
  .form-group label { font-size: 12px; font-weight: 600; color: ${B}; letter-spacing: 0.3px; }
  .form-group input, .form-group select, .form-group textarea {
    padding: 10px 13px;
    border: 1.5px solid #DDD;
    border-radius: 7px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px; color: ${DARK};
    background: white;
    transition: border-color 0.15s;
    outline: none;
  }
  .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
    border-color: ${B};
  }
  .form-group textarea { resize: vertical; min-height: 80px; }

  .checkbox-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
  .checkbox-item {
    display: flex; align-items: center; gap: 7px;
    padding: 8px 11px;
    border: 1.5px solid #EEE;
    border-radius: 6px;
    cursor: pointer;
    font-size: 12px; font-weight: 500;
    transition: all 0.15s;
    user-select: none;
  }
  .checkbox-item:hover { border-color: ${B}; background: ${LIGHT_B}; }
  .checkbox-item.checked { border-color: ${B}; background: ${LIGHT_B}; color: ${B}; }
  .checkbox-item input { width: 14px; height: 14px; accent-color: ${B}; }

  /* TABLE */
  .table-wrap { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; }
  th {
    text-align: left; padding: 11px 14px;
    font-size: 11px; font-weight: 700;
    color: ${MUTED}; text-transform: uppercase; letter-spacing: 0.8px;
    background: #FAFAFA; border-bottom: 2px solid #EEE5E7;
  }
  td { padding: 12px 14px; font-size: 13px; border-bottom: 1px solid #F5F0F1; vertical-align: middle; }
  tr:hover td { background: #FDFBFB; }
  tr:last-child td { border-bottom: none; }

  /* FOLLOW-UP CADENCE */
  .cadence-row {
    display: flex; align-items: stretch; gap: 0;
    background: white; border: 1px solid #EEE5E7;
    border-radius: 10px; overflow: hidden;
    margin-bottom: 10px;
  }
  .cadence-interval {
    width: 90px; min-width: 90px;
    background: ${B};
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    padding: 12px 8px;
    font-size: 11px; font-weight: 700; color: ${GOLD};
    text-align: center; letter-spacing: 0.5px;
    text-transform: uppercase;
  }
  .cadence-interval.done { background: #4A4A4A; color: #AAA; }
  .cadence-interval.overdue { background: ${DANGER}; color: white; }
  .cadence-interval.upcoming { background: ${B}; }
  .cadence-body { flex: 1; padding: 12px 16px; display: flex; align-items: center; gap: 16px; }
  .cadence-info { flex: 1; }
  .cadence-due { font-size: 11px; color: ${MUTED}; }
  .cadence-due strong { color: ${DARK}; }
  .cadence-checks { display: flex; gap: 10px; }
  .check-btn {
    display: flex; align-items: center; gap: 5px;
    padding: 5px 10px; border-radius: 5px;
    font-size: 11px; font-weight: 600; cursor: pointer;
    border: 1.5px solid #DDD;
    background: white; transition: all 0.15s;
  }
  .check-btn:hover { border-color: ${B}; color: ${B}; }
  .check-btn.done { background: ${SUCCESS}; color: white; border-color: ${SUCCESS}; }

  /* SEARCH */
  .search-bar {
    display: flex; align-items: center; gap: 10px;
    background: white; border: 1.5px solid #DDD;
    border-radius: 8px; padding: 8px 14px;
    flex: 1; max-width: 320px;
  }
  .search-bar input {
    border: none; outline: none; font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    width: 100%; background: transparent;
  }

  /* MODAL */
  .modal-overlay {
    position: fixed; inset: 0;
    background: rgba(26,10,14,0.6);
    z-index: 200; display: flex; align-items: center; justify-content: center;
    padding: 20px;
  }
  .modal {
    background: white; border-radius: 12px;
    width: 100%; max-width: 680px;
    max-height: 90vh; overflow-y: auto;
    box-shadow: 0 20px 60px rgba(107,26,42,0.2);
  }
  .modal-header {
    padding: 20px 24px 16px;
    border-bottom: 1px solid #EEE5E7;
    display: flex; align-items: center; justify-content: space-between;
    position: sticky; top: 0; background: white; z-index: 10;
  }
  .modal-header h3 { font-family: 'Playfair Display', serif; font-size: 18px; color: ${B}; }
  .modal-body { padding: 24px; }
  .modal-footer { padding: 16px 24px; border-top: 1px solid #EEE5E7; display: flex; gap: 10px; justify-content: flex-end; }
  .close-btn { background: none; border: none; font-size: 20px; cursor: pointer; color: ${MUTED}; padding: 2px 6px; }
  .close-btn:hover { color: ${B}; }

  /* SECTION HEADER */
  .section-burg {
    background: ${B}; color: white;
    padding: 14px 20px; border-radius: 8px;
    margin-bottom: 16px;
  }
  .section-burg h3 { font-family: 'Playfair Display', serif; font-size: 16px; }
  .section-burg p { font-size: 11px; opacity: 0.65; margin-top: 2px; }

  /* PARTNER CARD */
  .partner-card {
    background: white; border: 1px solid #EEE5E7; border-radius: 10px;
    padding: 18px; transition: all 0.15s;
  }
  .partner-card:hover { border-color: ${B}; box-shadow: 0 4px 16px rgba(107,26,42,0.08); }
  .partner-name { font-family: 'Playfair Display', serif; font-size: 15px; color: ${B}; font-weight: 700; }
  .partner-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }

  .tag {
    display: inline-block;
    padding: 2px 8px; border-radius: 4px;
    font-size: 11px; font-weight: 500;
    background: ${LIGHT_B}; color: ${B};
    margin: 2px;
  }

  /* ALERTS */
  .alert {
    display: flex; align-items: flex-start; gap: 10px;
    padding: 12px 16px; border-radius: 8px; margin-bottom: 12px;
    font-size: 13px;
  }
  .alert-warn { background: #FFF8E1; border-left: 4px solid ${GOLD}; color: #5D4037; }
  .alert-danger { background: #FDECEA; border-left: 4px solid ${DANGER}; color: #B71C1C; }
  .alert-success { background: #E8F5E9; border-left: 4px solid ${SUCCESS}; color: #1B5E20; }

  /* PROGRESS */
  .progress-bar { height: 6px; background: #EEE; border-radius: 3px; overflow: hidden; }
  .progress-fill { height: 100%; background: ${B}; border-radius: 3px; transition: width 0.3s; }
  .progress-fill.gold { background: ${GOLD}; }

  /* INTAKE SUCCESS */
  .intake-success {
    text-align: center; padding: 40px 20px;
  }
  .intake-success .checkmark { font-size: 56px; margin-bottom: 16px; }
  .intake-success h3 { font-family: 'Playfair Display', serif; font-size: 22px; color: ${B}; }
  .intake-success p { color: ${MUTED}; font-size: 14px; margin-top: 8px; }
  .intake-success .ref-id {
    display: inline-block; background: ${LIGHT_B}; color: ${B};
    padding: 8px 20px; border-radius: 8px; margin: 16px 0;
    font-weight: 700; font-size: 15px; letter-spacing: 1px;
    font-family: monospace;
  }

  .empty-state { text-align: center; padding: 48px 20px; color: ${MUTED}; }
  .empty-state .icon { font-size: 40px; margin-bottom: 12px; }
  .empty-state h4 { font-size: 16px; color: ${B}; margin-bottom: 6px; }

  .divider { border: none; border-top: 1px solid #EEE5E7; margin: 20px 0; }
  .text-muted { color: ${MUTED}; font-size: 12px; }
  .text-danger { color: ${DANGER}; }
  .text-success { color: ${SUCCESS}; }
  .fw-600 { font-weight: 600; }
  .gap-8 { display: flex; gap: 8px; align-items: center; }
  .flex-between { display: flex; justify-content: space-between; align-items: center; }
  .mb-4 { margin-bottom: 4px; }
  .mb-8 { margin-bottom: 8px; }
  .mb-16 { margin-bottom: 16px; }
  .mb-24 { margin-bottom: 24px; }
  .mt-8 { margin-top: 8px; }
`;

// ── COMPONENTS ────────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const map = { new: ["badge-new", "New"], active: ["badge-active", "Active"], overdue_followup: ["badge-overdue", "Follow-Up Overdue"], completed: ["badge-complete", "Completed"], escalated: ["badge-overdue", "Escalated"] };
  const [cls, label] = map[status] || ["badge-new", status];
  return <span className={`badge ${cls}`}>{label}</span>;
}

function UrgencyBadge({ u }) {
  return <span className={`badge ${u === "urgent" ? "badge-urgent" : u === "high" ? "badge-limited" : "badge-new"}`}>{u?.charAt(0).toUpperCase() + u?.slice(1)}</span>;
}

// ── INTAKE FORM ────────────────────────────────────────────────────────────────
function IntakeForm({ navigators, partners, onSubmit }) {
  const [form, setForm] = useState({
    source: "family", contactName: "", contactPhone: "", contactEmail: "",
    studentGrade: "", school: "", address: "",
    needCategories: [], urgency: "standard", notes: "",
    assignedNavigator: "", partnerOrg: ""
  });
  const [submitted, setSubmitted] = useState(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleNeed = n => set("needCategories", form.needCategories.includes(n) ? form.needCategories.filter(x => x !== n) : [...form.needCategories, n]);

  const handleSubmit = async () => {
    if (!form.contactName || !form.contactPhone || form.needCategories.length === 0) {
      alert("Please fill in contact name, phone, and at least one area of need.");
      return;
    }
    const today = new Date().toISOString().split("T")[0];
    const ref = { ...form, id: generateId(), status: "new", dateReceived: today, handoffDate: null, followUps: [], createdAt: Date.now() };
    await onSubmit(ref);
    setSubmitted(ref);
  };

  if (submitted) return (
    <div className="intake-success">
      <div className="checkmark">✅</div>
      <h3>Referral Received</h3>
      <p>The referral has been logged and is ready for navigator assignment.</p>
      <div className="ref-id">{submitted.id.split("_").slice(-1)[0].toUpperCase()}</div>
      <p className="text-muted mb-16">Received: {submitted.dateReceived} · Source: {submitted.source === "family" ? "Family Self-Referral" : "CPS School"}</p>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <button className="btn btn-primary" onClick={() => setSubmitted(null)}>Submit Another Referral</button>
      </div>
    </div>
  );

  return (
    <div>
      <div className="section-burg mb-24">
        <h3>New Referral Intake</h3>
        <p>Complete this form for every new family or student referred to Kingdom Konnect.</p>
      </div>

      {/* Source */}
      <div className="mb-16">
        <div className="form-group" style={{ marginBottom: 12 }}><label>Referral Source *</label></div>
        <div style={{ display: "flex", gap: 10 }}>
          {[["family", "👨‍👩‍👧 Family Self-Referral"], ["cps", "🏫 CPS School"]].map(([v, l]) => (
            <div key={v} className={`checkbox-item ${form.source === v ? "checked" : ""}`} style={{ flex: 1 }} onClick={() => set("source", v)}>
              <span style={{ fontSize: 14 }}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      {form.source === "cps" && (
        <div className="form-grid mb-16">
          <div className="form-group">
            <label>CPS School *</label>
            <select value={form.school} onChange={e => set("school", e.target.value)}>
              <option value="">Select school…</option>
              {CPS_SCHOOLS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Student Grade</label>
            <select value={form.studentGrade} onChange={e => set("studentGrade", e.target.value)}>
              <option value="">Select grade…</option>
              {["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
        </div>
      )}

      {/* Contact */}
      <div className="card mb-16">
        <div className="card-title mb-8">Contact Information</div>
        <div className="form-grid">
          <div className="form-group">
            <label>Contact Name *</label>
            <input placeholder="Parent, guardian, or student name" value={form.contactName} onChange={e => set("contactName", e.target.value)} />
          </div>
          <div className="form-group">
            <label>Phone Number *</label>
            <input placeholder="(773) 000-0000" value={form.contactPhone} onChange={e => set("contactPhone", e.target.value)} />
          </div>
          <div className="form-group">
            <label>Email (optional)</label>
            <input placeholder="email@example.com" value={form.contactEmail} onChange={e => set("contactEmail", e.target.value)} />
          </div>
          <div className="form-group">
            <label>Address / Neighborhood</label>
            <input placeholder="Englewood or general area" value={form.address} onChange={e => set("address", e.target.value)} />
          </div>
        </div>
      </div>

      {/* Needs */}
      <div className="card mb-16">
        <div className="card-title mb-8">Areas of Need *</div>
        <div className="checkbox-grid">
          {NEED_CATEGORIES.map(n => (
            <div key={n} className={`checkbox-item ${form.needCategories.includes(n) ? "checked" : ""}`} onClick={() => toggleNeed(n)}>
              <input type="checkbox" readOnly checked={form.needCategories.includes(n)} /> {n}
            </div>
          ))}
        </div>
      </div>

      {/* Urgency + Assignment */}
      <div className="form-grid mb-16">
        <div className="form-group">
          <label>Urgency Level</label>
          <select value={form.urgency} onChange={e => set("urgency", e.target.value)}>
            <option value="standard">Standard</option>
            <option value="high">High</option>
            <option value="urgent">Urgent — Immediate Need</option>
          </select>
        </div>
        <div className="form-group">
          <label>Assign Navigator</label>
          <select value={form.assignedNavigator} onChange={e => set("assignedNavigator", e.target.value)}>
            <option value="">Assign later…</option>
            {navigators.filter(n => n.role !== "admin").map(n => <option key={n.id} value={n.id}>{n.name}</option>)}
          </select>
        </div>
        <div className="form-group form-full">
          <label>Notes</label>
          <textarea placeholder="Any additional context about the family's situation, barriers, or specific needs…" value={form.notes} onChange={e => set("notes", e.target.value)} />
        </div>
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button className="btn btn-primary" onClick={handleSubmit}>Submit Referral →</button>
        <button className="btn btn-ghost" onClick={() => setForm({ source: "family", contactName: "", contactPhone: "", contactEmail: "", studentGrade: "", school: "", address: "", needCategories: [], urgency: "standard", notes: "", assignedNavigator: "", partnerOrg: "" })}>Clear Form</button>
      </div>
    </div>
  );
}

// ── NAVIGATOR DASHBOARD ───────────────────────────────────────────────────────
function Dashboard({ referrals, navigators, partners, onUpdate }) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const overdue = referrals.filter(r => r.status === "overdue_followup" || r.followUps?.some(f => !f.completedDate && daysUntil(f.dueDate) < 0));
  const urgent = referrals.filter(r => r.urgency === "urgent" && r.status !== "completed");
  const active = referrals.filter(r => r.status !== "completed");

  const filtered = referrals.filter(r => {
    if (filter === "active") return r.status !== "completed";
    if (filter === "overdue") return overdue.some(o => o.id === r.id);
    if (filter === "urgent") return r.urgency === "urgent";
    if (filter === "unassigned") return !r.assignedNavigator;
    return true;
  }).filter(r => !search || r.contactName?.toLowerCase().includes(search.toLowerCase()) || r.school?.toLowerCase().includes(search.toLowerCase()) || r.needCategories?.some(n => n.toLowerCase().includes(search.toLowerCase())));

  const getNav = id => navigators.find(n => n.id === id);
  const getPartner = id => partners.find(p => p.id === id);

  const handleHandoff = async (ref) => {
    const today = new Date().toISOString().split("T")[0];
    const updated = { ...ref, status: "active", handoffDate: today, followUps: buildFollowUps(today) };
    await onUpdate(updated);
    setSelected(updated);
  };

  return (
    <div>
      {/* Alerts */}
      {overdue.length > 0 && <div className="alert alert-danger">⚠️ <strong>{overdue.length} referral{overdue.length > 1 ? "s" : ""}</strong> have overdue follow-ups that need immediate attention.</div>}
      {urgent.length > 0 && <div className="alert alert-warn">🔴 <strong>{urgent.length} urgent referral{urgent.length > 1 ? "s" : ""}</strong> require priority response within 24–48 hours.</div>}

      {/* Stats */}
      <div className="stat-grid">
        {[
          { label: "Total Referrals", value: referrals.length, cls: "" },
          { label: "Active", value: active.length, cls: "gold" },
          { label: "Overdue Follow-Ups", value: overdue.length, cls: overdue.length > 0 ? "danger" : "success" },
          { label: "Completed", value: referrals.filter(r => r.status === "completed").length, cls: "success" },
        ].map(s => (
          <div key={s.label} className="card">
            <div className="card-title">{s.label}</div>
            <div className={`card-value ${s.cls}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Filters + Search */}
      <div className="flex-between mb-16">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[["all", "All"], ["active", "Active"], ["overdue", `Overdue (${overdue.length})`], ["urgent", `Urgent (${urgent.length})`], ["unassigned", "Unassigned"]].map(([k, l]) => (
            <button key={k} className={`btn btn-sm ${filter === k ? "btn-primary" : "btn-ghost"}`} onClick={() => setFilter(k)}>{l}</button>
          ))}
        </div>
        <div className="search-bar">
          <span>🔍</span>
          <input placeholder="Search by name, school, need…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0 }}>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Contact</th><th>Source</th><th>Need(s)</th><th>Urgency</th>
                <th>Navigator</th><th>Status</th><th>Received</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={8}><div className="empty-state"><div className="icon">📋</div><h4>No referrals found</h4><p>Adjust your filters or submit a new intake.</p></div></td></tr>
              )}
              {filtered.map(r => {
                const nav = getNav(r.assignedNavigator);
                const nextFollowUp = r.followUps?.find(f => !f.completedDate);
                const isOverdue = nextFollowUp && daysUntil(nextFollowUp.dueDate) < 0;
                return (
                  <tr key={r.id} style={{ cursor: "pointer" }} onClick={() => setSelected(r)}>
                    <td>
                      <div className="fw-600">{r.contactName}</div>
                      <div className="text-muted">{r.contactPhone}</div>
                    </td>
                    <td><span className="badge badge-new">{r.source === "family" ? "Family" : "CPS"}</span>{r.school && <div className="text-muted" style={{ fontSize: 11, marginTop: 2 }}>{r.school}</div>}</td>
                    <td>{r.needCategories?.slice(0, 2).map(n => <span key={n} className="tag">{n}</span>)}{r.needCategories?.length > 2 && <span className="text-muted"> +{r.needCategories.length - 2}</span>}</td>
                    <td><UrgencyBadge u={r.urgency} /></td>
                    <td>{nav ? <span className="fw-600" style={{ fontSize: 12 }}>{nav.name}</span> : <span className="text-muted">Unassigned</span>}</td>
                    <td>
                      <StatusBadge status={isOverdue ? "overdue_followup" : r.status} />
                      {nextFollowUp && !isOverdue && <div className="text-muted" style={{ fontSize: 10, marginTop: 2 }}>Next: {nextFollowUp.label} ({daysUntil(nextFollowUp.dueDate)}d)</div>}
                    </td>
                    <td className="text-muted">{r.dateReceived}</td>
                    <td>
                      <div style={{ display: "flex", gap: 6 }}>
                        {!r.handoffDate && <button className="btn btn-xs btn-gold" onClick={e => { e.stopPropagation(); handleHandoff(r); }}>Handoff ✓</button>}
                        <button className="btn btn-xs btn-outline" onClick={e => { e.stopPropagation(); setSelected(r); }}>View</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {selected && <ReferralModal ref_={selected} navigators={navigators} partners={partners} onClose={() => setSelected(null)} onUpdate={async u => { await onUpdate(u); setSelected(u); }} onHandoff={handleHandoff} />}
    </div>
  );
}

// ── REFERRAL MODAL ────────────────────────────────────────────────────────────
function ReferralModal({ ref_, navigators, partners, onClose, onUpdate, onHandoff }) {
  const [r, setR] = useState({ ...ref_ });
  const nav = navigators.find(n => n.id === r.assignedNavigator);
  const partner = partners.find(p => p.id === r.partnerOrg);

  const set = (k, v) => setR(prev => ({ ...prev, [k]: v }));
  const save = () => onUpdate(r);

  const toggleCheck = (idx, field) => {
    const fus = [...(r.followUps || [])];
    fus[idx] = { ...fus[idx], [field]: !fus[idx][field], completedDate: (!fus[idx].familyContacted || !fus[idx].partnerContacted) ? null : new Date().toISOString().split("T")[0] };
    if (fus[idx].familyContacted && fus[idx].partnerContacted) fus[idx].completedDate = new Date().toISOString().split("T")[0];
    setR(prev => ({ ...prev, followUps: fus }));
  };

  const completedCount = r.followUps?.filter(f => f.completedDate).length || 0;
  const totalCount = r.followUps?.length || 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3>{r.contactName}</h3>
            <div style={{ display: "flex", gap: 8, marginTop: 4, alignItems: "center" }}>
              <StatusBadge status={r.status} /><UrgencyBadge u={r.urgency} />
              <span className="text-muted" style={{ fontSize: 11 }}>Received {r.dateReceived}</span>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">

          {/* Assignment */}
          <div className="form-grid mb-16">
            <div className="form-group">
              <label>Assigned Navigator</label>
              <select value={r.assignedNavigator || ""} onChange={e => set("assignedNavigator", e.target.value)}>
                <option value="">Unassigned</option>
                <optgroup label="Navigators">
                  {navigators.filter(n => n.role !== "admin").map(n => <option key={n.id} value={n.id}>{n.name}</option>)}
                </optgroup>
                <optgroup label="Administration">
                  {navigators.filter(n => n.role === "admin").map(n => <option key={n.id} value={n.id}>{n.name} (Admin)</option>)}
                </optgroup>
              </select>
            </div>
            <div className="form-group">
              <label>Partner Organization</label>
              <select value={r.partnerOrg || ""} onChange={e => set("partnerOrg", e.target.value)}>
                <option value="">Not yet connected</option>
                {partners.map(p => <option key={p.id} value={p.id}>{p.orgName}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select value={r.status} onChange={e => set("status", e.target.value)}>
                <option value="new">New</option>
                <option value="active">Active</option>
                <option value="escalated">Escalated</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="form-group">
              <label>Urgency</label>
              <select value={r.urgency} onChange={e => set("urgency", e.target.value)}>
                <option value="standard">Standard</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          {/* Contact Info */}
          <div className="card mb-16">
            <div className="card-title mb-8">Contact Info</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              <div><div className="text-muted mb-4">Phone</div><div className="fw-600">{r.contactPhone || "—"}</div></div>
              <div><div className="text-muted mb-4">Email</div><div className="fw-600">{r.contactEmail || "—"}</div></div>
              <div><div className="text-muted mb-4">School</div><div className="fw-600">{r.school || "—"}</div></div>
            </div>
            <hr className="divider" />
            <div><div className="text-muted mb-4">Areas of Need</div><div>{r.needCategories?.map(n => <span key={n} className="tag">{n}</span>)}</div></div>
            {r.notes && <div style={{ marginTop: 12 }}><div className="text-muted mb-4">Notes</div><div style={{ fontSize: 13 }}>{r.notes}</div></div>}
          </div>

          {/* Handoff status */}
          {!r.handoffDate ? (
            <div className="alert alert-warn mb-16">
              ⏳ <strong>Warm handoff not yet completed.</strong> Complete the intake call and partner connection, then mark the handoff to start the follow-up clock.
              <button className="btn btn-gold btn-sm" style={{ marginLeft: 12 }} onClick={() => onHandoff(r)}>Mark Handoff Complete</button>
            </div>
          ) : (
            <div className="alert alert-success mb-16">
              ✅ <strong>Handoff completed {r.handoffDate}.</strong> {totalCount > 0 && `Follow-up progress: ${completedCount} / ${totalCount} intervals complete.`}
              {totalCount > 0 && <div className="progress-bar" style={{ marginTop: 8 }}><div className="progress-fill" style={{ width: `${(completedCount / totalCount) * 100}%` }} /></div>}
            </div>
          )}

          {/* Follow-up cadence */}
          {r.followUps?.length > 0 && (
            <div>
              <div className="card-title mb-8">Follow-Up Cadence</div>
              {r.followUps.map((f, idx) => {
                const du = daysUntil(f.dueDate);
                const isDone = f.completedDate;
                const isOver = !isDone && du < 0;
                return (
                  <div key={f.key} className="cadence-row">
                    <div className={`cadence-interval ${isDone ? "done" : isOver ? "overdue" : "upcoming"}`}>
                      {f.label}
                    </div>
                    <div className="cadence-body">
                      <div className="cadence-info">
                        <div className="cadence-due">Due: <strong>{f.dueDate}</strong> {isDone ? <span className="text-success">· Completed {f.completedDate}</span> : isOver ? <span className="text-danger">· {Math.abs(du)} days overdue</span> : <span className="text-muted">· In {du} days</span>}</div>
                        {f.notes && <div className="text-muted" style={{ fontSize: 11, marginTop: 2 }}>{f.notes}</div>}
                      </div>
                      <div className="cadence-checks">
                        <button className={`check-btn ${f.familyContacted ? "done" : ""}`} onClick={() => toggleCheck(idx, "familyContacted")}>
                          {f.familyContacted ? "✓" : "○"} Family
                        </button>
                        <button className={`check-btn ${f.partnerContacted ? "done" : ""}`} onClick={() => toggleCheck(idx, "partnerContacted")}>
                          {f.partnerContacted ? "✓" : "○"} Partner
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Notes */}
          <div className="form-group mt-8">
            <label>Update Notes</label>
            <textarea value={r.notes || ""} onChange={e => set("notes", e.target.value)} placeholder="Add notes about this referral…" />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={save}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

// ── FOLLOW-UP TRACKER ─────────────────────────────────────────────────────────
function FollowUpTracker({ referrals, navigators, onUpdate }) {
  const [view, setView] = useState("overdue");

  const allFollowUps = referrals.flatMap(r =>
    (r.followUps || []).map((f, idx) => ({
      ...f, idx, ref: r,
      navigator: navigators.find(n => n.id === r.assignedNavigator),
      daysUntilDue: daysUntil(f.dueDate),
    }))
  );

  const overdue = allFollowUps.filter(f => !f.completedDate && f.daysUntilDue < 0);
  const today_ = allFollowUps.filter(f => !f.completedDate && f.daysUntilDue >= 0 && f.daysUntilDue <= 2);
  const upcoming = allFollowUps.filter(f => !f.completedDate && f.daysUntilDue > 2 && f.daysUntilDue <= 14);
  const completed = allFollowUps.filter(f => f.completedDate);

  const displayed = view === "overdue" ? overdue : view === "today" ? today_ : view === "upcoming" ? upcoming : completed;

  const toggle = async (fu, field) => {
    const fus = [...fu.ref.followUps];
    fus[fu.idx] = { ...fus[fu.idx], [field]: !fus[fu.idx][field] };
    if (fus[fu.idx].familyContacted && fus[fu.idx].partnerContacted) fus[fu.idx].completedDate = new Date().toISOString().split("T")[0];
    else fus[fu.idx].completedDate = null;
    await onUpdate({ ...fu.ref, followUps: fus });
  };

  return (
    <div>
      {overdue.length > 0 && <div className="alert alert-danger mb-24">⚠️ <strong>{overdue.length} follow-up{overdue.length > 1 ? "s" : ""} overdue.</strong> These families need contact today. Navigate to each referral and log your outreach.</div>}

      <div style={{ display: "flex", gap: 14, margin: "0 0 20px" }}>
        {[["overdue", `🔴 Overdue (${overdue.length})`, "btn-danger"], ["today", `🟡 Due Soon (${today_.length})`, "btn-gold"], ["upcoming", `🔵 Upcoming (${upcoming.length})`, "btn-outline"], ["completed", `✅ Completed (${completed.length})`, "btn-ghost"]].map(([k, l, cls]) => (
          <button key={k} className={`btn btn-sm ${view === k ? cls : "btn-ghost"}`} onClick={() => setView(k)}>{l}</button>
        ))}
      </div>

      {displayed.length === 0 ? (
        <div className="empty-state"><div className="icon">{view === "overdue" ? "✅" : "📅"}</div><h4>{view === "overdue" ? "No overdue follow-ups!" : "Nothing here yet"}</h4><p>All follow-ups in this category are clear.</p></div>
      ) : displayed.map((fu, i) => (
        <div key={i} className="cadence-row" style={{ marginBottom: 10 }}>
          <div className={`cadence-interval ${fu.completedDate ? "done" : fu.daysUntilDue < 0 ? "overdue" : "upcoming"}`} style={{ width: 110 }}>
            <div>{fu.label}</div>
            <div style={{ fontSize: 10, marginTop: 3, opacity: 0.8 }}>{fu.daysUntilDue < 0 ? `${Math.abs(fu.daysUntilDue)}d late` : `${fu.daysUntilDue}d`}</div>
          </div>
          <div className="cadence-body">
            <div className="cadence-info">
              <div className="fw-600">{fu.ref.contactName}</div>
              <div className="text-muted" style={{ fontSize: 11 }}>
                {fu.ref.needCategories?.slice(0, 2).join(", ")} ·{" "}
                {fu.navigator ? fu.navigator.name : "Unassigned"} ·{" "}
                Due {fu.dueDate}
              </div>
            </div>
            <div className="cadence-checks">
              <button className={`check-btn ${fu.familyContacted ? "done" : ""}`} onClick={() => toggle(fu, "familyContacted")}>
                {fu.familyContacted ? "✓" : "○"} Family
              </button>
              <button className={`check-btn ${fu.partnerContacted ? "done" : ""}`} onClick={() => toggle(fu, "partnerContacted")}>
                {fu.partnerContacted ? "✓" : "○"} Partner
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── PARTNER DIRECTORY ─────────────────────────────────────────────────────────
function PartnerDirectory({ partners, setPartners }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [confirmedOnly, setConfirmedOnly] = useState(false);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ orgName: "", contactName: "", title: "", phone: "", email: "", serviceCategories: [], capacity: "accepting", confirmed: false, notes: "" });

  const allCategories = [...new Set(partners.flatMap(p => p.serviceCategories))].sort();
  const filtered = partners.filter(p =>
    (!search || p.orgName.toLowerCase().includes(search.toLowerCase()) ||
      p.serviceCategories.some(s => s.toLowerCase().includes(search.toLowerCase())) ||
      (p.contactName || "").toLowerCase().includes(search.toLowerCase())) &&
    (filter === "all" || p.serviceCategories.includes(filter) || p.capacity === filter) &&
    (!confirmedOnly || p.confirmed)
  ).sort((a, b) => {
    if (a.confirmed && !b.confirmed) return -1;
    if (!a.confirmed && b.confirmed) return 1;
    return a.orgName.localeCompare(b.orgName);
  });

  const addPartner = async () => {
    if (!form.orgName) return;
    const newP = { ...form, id: generateId() };
    const updated = [...partners, newP];
    await save("kk_partners", updated);
    setPartners(updated);
    setAdding(false);
    setForm({ orgName: "", contactName: "", title: "", phone: "", email: "", serviceCategories: [], capacity: "accepting", confirmed: false, notes: "" });
  };

  const toggleCat = c => setForm(f => ({ ...f, serviceCategories: f.serviceCategories.includes(c) ? f.serviceCategories.filter(x => x !== c) : [...f.serviceCategories, c] }));
  const confirmedCount = partners.filter(p => p.confirmed).length;

  return (
    <div>
      {/* Stats row */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <div className="card" style={{ padding: "12px 18px", flex: 1 }}>
          <div className="card-title">Total Partners</div>
          <div className="card-value">{partners.length}</div>
        </div>
        <div className="card" style={{ padding: "12px 18px", flex: 1 }}>
          <div className="card-title">Confirmed Contacts</div>
          <div className="card-value gold">{confirmedCount}</div>
        </div>
        <div className="card" style={{ padding: "12px 18px", flex: 1 }}>
          <div className="card-title">Service Areas</div>
          <div className="card-value">{allCategories.length}</div>
        </div>
        <div className="card" style={{ padding: "12px 18px", flex: 2 }}>
          <div className="card-title">Showing</div>
          <div className="card-value" style={{ fontSize: 22 }}>{filtered.length} <span style={{ fontSize: 13, fontFamily: "'DM Sans'", fontWeight: 400, color: MUTED }}>partners</span></div>
        </div>
      </div>

      <div className="flex-between mb-16">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <div className="search-bar"><span>🔍</span><input placeholder="Search org, contact, or service…" value={search} onChange={e => setSearch(e.target.value)} /></div>
          <select style={{ padding: "8px 12px", border: "1.5px solid #DDD", borderRadius: 8, fontSize: 13, fontFamily: "'DM Sans', sans-serif" }} value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="all">All Categories</option>
            {allCategories.map(c => <option key={c} value={c}>{c}</option>)}
            <option disabled>──────</option>
            <option value="accepting">Accepting Referrals</option>
            <option value="limited">Limited Capacity</option>
          </select>
          <div
            className={`checkbox-item ${confirmedOnly ? "checked" : ""}`}
            style={{ padding: "6px 12px" }}
            onClick={() => setConfirmedOnly(v => !v)}
          >
            <input type="checkbox" readOnly checked={confirmedOnly} /> ✓ Confirmed contacts only
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => setAdding(true)}>+ Add Partner</button>
      </div>

      <div className="partner-grid">
        {filtered.map(p => (
          <div key={p.id} className="partner-card" style={{ borderTop: p.confirmed ? `3px solid ${GOLD}` : "1px solid #EEE5E7" }}>
            <div className="flex-between mb-8">
              <div className="partner-name" style={{ fontSize: 14, flex: 1, marginRight: 8 }}>{p.orgName}</div>
              <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                {p.confirmed && <span className="badge" style={{ background: "#FFF8E0", color: "#7A5C00", fontSize: 10 }}>✓ Confirmed</span>}
                <span className={`badge ${p.capacity === "accepting" ? "badge-accepting" : "badge-limited"}`} style={{ fontSize: 10 }}>
                  {p.capacity === "accepting" ? "Accepting" : "Limited"}
                </span>
              </div>
            </div>
            <div style={{ marginBottom: 8, minHeight: 24 }}>{p.serviceCategories.map(c => <span key={c} className="tag" style={{ fontSize: 10 }}>{c}</span>)}</div>
            {p.contactName && <div className="text-muted" style={{ fontSize: 12, marginBottom: 3 }}>👤 {p.contactName}{p.title ? <span style={{ color: "#AAA" }}> · {p.title}</span> : ""}</div>}
            {p.email && <div className="text-muted" style={{ fontSize: 12, marginBottom: 3 }}>✉️ <a href={`mailto:${p.email}`} style={{ color: B, textDecoration: "none" }}>{p.email}</a></div>}
            {p.phone && <div className="text-muted" style={{ fontSize: 12, marginBottom: 3 }}>📞 {p.phone}</div>}
            {p.notes && p.notes !== "nan" && <div style={{ marginTop: 8, fontSize: 11, color: "#888", borderTop: "1px solid #F0EBEC", paddingTop: 8, lineHeight: 1.4 }}>{p.notes.replace(/ - org confirmed$/i,"").slice(0, 120)}{p.notes.length > 120 ? "…" : ""}</div>}
          </div>
        ))}
      </div>

      {filtered.length === 0 && <div className="empty-state"><div className="icon">🤝</div><h4>No partners found</h4><p>Try adjusting your search or filters.</p></div>}

      {adding && (
        <div className="modal-overlay" onClick={() => setAdding(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><h3>Add Partner Organization</h3><button className="close-btn" onClick={() => setAdding(false)}>×</button></div>
            <div className="modal-body">
              <div className="form-grid mb-16">
                <div className="form-group form-full"><label>Organization Name *</label><input value={form.orgName} onChange={e => setForm(f => ({ ...f, orgName: e.target.value }))} /></div>
                <div className="form-group"><label>Contact Name</label><input value={form.contactName} onChange={e => setForm(f => ({ ...f, contactName: e.target.value }))} /></div>
                <div className="form-group"><label>Phone</label><input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} /></div>
                <div className="form-group"><label>Email</label><input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} /></div>
                <div className="form-group"><label>Capacity</label><select value={form.capacity} onChange={e => setForm(f => ({ ...f, capacity: e.target.value }))}><option value="accepting">Accepting Referrals</option><option value="limited">Limited Capacity</option><option value="paused">Paused</option></select></div>
              </div>
              <div className="form-group mb-16">
                <label>Service Categories</label>
                <div className="checkbox-grid" style={{ marginTop: 8 }}>
                  {NEED_CATEGORIES.filter(n => n !== "Other").map(n => (
                    <div key={n} className={`checkbox-item ${form.serviceCategories.includes(n) ? "checked" : ""}`} onClick={() => toggleCat(n)}>
                      <input type="checkbox" readOnly checked={form.serviceCategories.includes(n)} /> {n}
                    </div>
                  ))}
                </div>
              </div>
              <div className="form-group"><label>Notes</label><textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Capacity notes, best practices for referral, key contacts…" /></div>
            </div>
            <div className="modal-footer"><button className="btn btn-ghost" onClick={() => setAdding(false)}>Cancel</button><button className="btn btn-primary" onClick={addPartner}>Add Partner</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── EXPORT ────────────────────────────────────────────────────────────────────
function ExportView({ referrals, navigators, partners }) {
  const nav = id => navigators.find(n => n.id === id)?.name || "";
  const part = id => partners.find(p => p.id === id)?.orgName || "";

  const exportCSV = () => {
    const headers = ["ID", "Date Received", "Source", "Contact Name", "Phone", "Email", "School", "Needs", "Urgency", "Navigator", "Partner Org", "Handoff Date", "Status", "Follow-Ups Completed", "Notes"];
    const rows = referrals.map(r => [
      r.id, r.dateReceived, r.source === "cps" ? "CPS School" : "Family",
      r.contactName, r.contactPhone, r.contactEmail || "",
      r.school || "", r.needCategories?.join("; ") || "",
      r.urgency, nav(r.assignedNavigator), part(r.partnerOrg),
      r.handoffDate || "", r.status,
      `${r.followUps?.filter(f => f.completedDate).length || 0}/${r.followUps?.length || 0}`,
      (r.notes || "").replace(/,/g, ";")
    ]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `KingdomKonnect_Referrals_${new Date().toISOString().split("T")[0]}.csv`;
    a.click(); URL.revokeObjectURL(url);
  };

  const stats = {
    total: referrals.length,
    active: referrals.filter(r => r.status === "active").length,
    completed: referrals.filter(r => r.status === "completed").length,
    handoffed: referrals.filter(r => r.handoffDate).length,
    byNav: navigators.filter(n => n.role !== "admin").map(n => ({ name: n.name, count: referrals.filter(r => r.assignedNavigator === n.id).length })),
    byNeed: NEED_CATEGORIES.map(n => ({ need: n, count: referrals.filter(r => r.needCategories?.includes(n)).length })).filter(n => n.count > 0).sort((a, b) => b.count - a.count),
    bySource: [{ label: "Family Self-Referral", count: referrals.filter(r => r.source === "family").length }, { label: "CPS School", count: referrals.filter(r => r.source === "cps").length }],
  };

  return (
    <div>
      <div className="section-burg mb-24">
        <h3>Data Export & Reporting</h3>
        <p>Download referral data for CPS reporting, funder updates, and internal tracking.</p>
      </div>

      <div className="stat-grid mb-24">
        {[["Total Referrals", stats.total, ""], ["Active", stats.active, "gold"], ["Handoffs Made", stats.handoffed, ""], ["Completed", stats.completed, "success"]].map(([l, v, c]) => (
          <div key={l} className="card"><div className="card-title">{l}</div><div className={`card-value ${c}`}>{v}</div></div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 24 }}>
        <div className="card">
          <div className="card-title mb-16">By Navigator</div>
          {stats.byNav.map(n => (
            <div key={n.name} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 13 }}>
              <span>{n.name}</span><span className="fw-600" style={{ color: B }}>{n.count}</span>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="card-title mb-16">By Source</div>
          {stats.bySource.map(s => (
            <div key={s.label} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 13 }}><span>{s.label}</span><span className="fw-600" style={{ color: B }}>{s.count}</span></div>
              <div className="progress-bar"><div className="progress-fill gold" style={{ width: stats.total ? `${(s.count / stats.total) * 100}%` : "0%" }} /></div>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="card-title mb-16">Top Needs</div>
          {stats.byNeed.slice(0, 6).map(n => (
            <div key={n.need} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13 }}>
              <span>{n.need}</span><span className="fw-600" style={{ color: B }}>{n.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="flex-between">
          <div>
            <div className="fw-600" style={{ fontSize: 15, color: B }}>Export All Referral Data</div>
            <div className="text-muted" style={{ marginTop: 4 }}>Download a CSV of all {referrals.length} referrals with full detail — for CPS reporting, funder updates, or backup.</div>
          </div>
          <button className="btn btn-primary" onClick={exportCSV}>⬇ Download CSV</button>
        </div>
      </div>
    </div>
  );
}

// ── APP ROOT ──────────────────────────────────────────────────────────────────
// ── PUBLIC INTAKE PAGE ────────────────────────────────────────────────────────
function PublicIntake() {
  const [form, setForm] = useState({
    source: "family", contactName: "", contactPhone: "", contactEmail: "",
    studentGrade: "", school: "", address: "",
    needCategories: [], urgency: "standard", notes: ""
  });
  const [submitted, setSubmitted] = useState(null);
  const [saving, setSaving] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleNeed = n => set("needCategories", form.needCategories.includes(n) ? form.needCategories.filter(x => x !== n) : [...form.needCategories, n]);

  const handleSubmit = async () => {
    if (!form.contactName || !form.contactPhone || form.needCategories.length === 0) {
      alert("Please fill in contact name, phone, and at least one area of need.");
      return;
    }
    setSaving(true);
    const today = new Date().toISOString().split("T")[0];
    const ref = { ...form, id: generateId(), status: "new", dateReceived: today, handoffDate: null, followUps: [], createdAt: Date.now(), assignedNavigator: "", partnerOrg: "" };
    const existing = await load("kk_referrals", []);
    await save("kk_referrals", [...existing, ref]);
    setSaving(false);
    setSubmitted(ref);
  };

  if (submitted) return (
    <div style={{minHeight:"100vh",background:"#1a0a0f",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Sans',sans-serif",padding:"24px"}}>
      <div style={{background:"#2a0a12",border:"2px solid #C9A84C",borderRadius:"16px",padding:"48px 40px",textAlign:"center",maxWidth:"480px",width:"100%"}}>
        <div style={{fontSize:"3rem",marginBottom:"16px"}}>✅</div>
        <div style={{fontFamily:"'Playfair Display',serif",color:"#C9A84C",fontSize:"1.5rem",fontWeight:"700",marginBottom:"12px"}}>Referral Submitted</div>
        <p style={{color:"#e8c5c5",marginBottom:"8px"}}>Thank you! A Kingdom Konnect navigator will reach out within 24–48 hours.</p>
        <p style={{color:"#C9A84C",fontSize:"0.85rem",marginBottom:"24px"}}>Reference: <strong>{submitted.id.split("_").slice(-1)[0].toUpperCase()}</strong></p>
        <button onClick={() => setSubmitted(null)} style={{background:"#6B1A2A",color:"#C9A84C",border:"none",borderRadius:"8px",padding:"12px 24px",fontSize:"1rem",fontWeight:"600",cursor:"pointer"}}>
          Submit Another Referral
        </button>
      </div>
    </div>
  );

  return (
    <div style={{minHeight:"100vh",background:"#1a0a0f",fontFamily:"'DM Sans',sans-serif",padding:"24px"}}>
      <div style={{maxWidth:"600px",margin:"0 auto"}}>
        {/* Header */}
        <div style={{textAlign:"center",marginBottom:"32px"}}>
          <div style={{fontSize:"2rem",marginBottom:"8px"}}>👑</div>
          <div style={{fontFamily:"'Playfair Display',serif",color:"#C9A84C",fontSize:"1.8rem",fontWeight:"700"}}>Kingdom Konnect</div>
          <div style={{color:"#d4a0a0",fontSize:"0.9rem",marginTop:"4px"}}>Request Support · Kingdom Avenue Inc.</div>
        </div>

        <div style={{background:"#2a0a12",border:"1px solid #6B1A2A",borderRadius:"12px",padding:"24px",marginBottom:"16px"}}>
          <div style={{color:"#C9A84C",fontWeight:"600",marginBottom:"16px",fontSize:"1rem"}}>Referral Source</div>
          <div style={{display:"flex",gap:"10px"}}>
            {[["family","👨‍👩‍👧 Family / Self-Referral"],["cps","🏫 CPS School"]].map(([v,l]) => (
              <div key={v} onClick={() => set("source",v)} style={{flex:1,padding:"12px",borderRadius:"8px",border: form.source===v ? "2px solid #C9A84C" : "2px solid #3a1a22",background: form.source===v ? "#3a1a22" : "transparent",color: form.source===v ? "#C9A84C" : "#d4a0a0",cursor:"pointer",textAlign:"center",fontSize:"0.9rem"}}>
                {l}
              </div>
            ))}
          </div>
        </div>

        {form.source === "cps" && (
          <div style={{background:"#2a0a12",border:"1px solid #6B1A2A",borderRadius:"12px",padding:"24px",marginBottom:"16px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"}}>
            <div>
              <label style={{color:"#C9A84C",fontSize:"0.85rem",display:"block",marginBottom:"6px"}}>CPS School</label>
              <select value={form.school} onChange={e => set("school",e.target.value)} style={{width:"100%",padding:"10px",background:"#1a0a0f",border:"1px solid #6B1A2A",borderRadius:"6px",color:"#e8c5c5",fontSize:"0.9rem"}}>
                <option value="">Select school…</option>
                {CPS_SCHOOLS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{color:"#C9A84C",fontSize:"0.85rem",display:"block",marginBottom:"6px"}}>Student Grade</label>
              <select value={form.studentGrade} onChange={e => set("studentGrade",e.target.value)} style={{width:"100%",padding:"10px",background:"#1a0a0f",border:"1px solid #6B1A2A",borderRadius:"6px",color:"#e8c5c5",fontSize:"0.9rem"}}>
                <option value="">Select…</option>
                {["K","1","2","3","4","5","6","7","8","9","10","11","12"].map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>
        )}

        <div style={{background:"#2a0a12",border:"1px solid #6B1A2A",borderRadius:"12px",padding:"24px",marginBottom:"16px"}}>
          <div style={{color:"#C9A84C",fontWeight:"600",marginBottom:"16px"}}>Contact Information</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"}}>
            {[
              ["contactName","Contact Name *","Parent, guardian, or student name","text"],
              ["contactPhone","Phone Number *","(773) 000-0000","tel"],
              ["contactEmail","Email (optional)","email@example.com","email"],
              ["address","Address / Neighborhood","Englewood or general area","text"],
            ].map(([k,label,ph,type]) => (
              <div key={k}>
                <label style={{color:"#C9A84C",fontSize:"0.85rem",display:"block",marginBottom:"6px"}}>{label}</label>
                <input type={type} placeholder={ph} value={form[k]} onChange={e => set(k,e.target.value)}
                  style={{width:"100%",padding:"10px",background:"#1a0a0f",border:"1px solid #6B1A2A",borderRadius:"6px",color:"#e8c5c5",fontSize:"0.9rem",boxSizing:"border-box"}} />
              </div>
            ))}
          </div>
        </div>

        <div style={{background:"#2a0a12",border:"1px solid #6B1A2A",borderRadius:"12px",padding:"24px",marginBottom:"16px"}}>
          <div style={{color:"#C9A84C",fontWeight:"600",marginBottom:"16px"}}>Areas of Need * <span style={{color:"#d4a0a0",fontWeight:"400",fontSize:"0.85rem"}}>(select all that apply)</span></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:"8px"}}>
            {NEED_CATEGORIES.map(n => (
              <div key={n} onClick={() => toggleNeed(n)} style={{padding:"10px 12px",borderRadius:"8px",border: form.needCategories.includes(n) ? "2px solid #C9A84C" : "2px solid #3a1a22",background: form.needCategories.includes(n) ? "#3a1a22" : "transparent",color: form.needCategories.includes(n) ? "#C9A84C" : "#d4a0a0",cursor:"pointer",fontSize:"0.85rem",display:"flex",alignItems:"center",gap:"8px"}}>
                <input type="checkbox" readOnly checked={form.needCategories.includes(n)} style={{accentColor:"#C9A84C"}} /> {n}
              </div>
            ))}
          </div>
        </div>

        <div style={{background:"#2a0a12",border:"1px solid #6B1A2A",borderRadius:"12px",padding:"24px",marginBottom:"24px"}}>
          <div style={{color:"#C9A84C",fontWeight:"600",marginBottom:"16px"}}>Urgency</div>
          <select value={form.urgency} onChange={e => set("urgency",e.target.value)} style={{width:"100%",padding:"10px",background:"#1a0a0f",border:"1px solid #6B1A2A",borderRadius:"6px",color:"#e8c5c5",fontSize:"0.9rem",marginBottom:"16px"}}>
            <option value="standard">Standard</option>
            <option value="high">High</option>
            <option value="urgent">Urgent — Immediate Need</option>
          </select>
          <label style={{color:"#C9A84C",fontSize:"0.85rem",display:"block",marginBottom:"6px"}}>Additional Notes</label>
          <textarea placeholder="Any additional context about your situation or specific needs…" value={form.notes} onChange={e => set("notes",e.target.value)}
            style={{width:"100%",padding:"10px",background:"#1a0a0f",border:"1px solid #6B1A2A",borderRadius:"6px",color:"#e8c5c5",fontSize:"0.9rem",minHeight:"80px",boxSizing:"border-box",resize:"vertical"}} />
        </div>

        <button onClick={handleSubmit} disabled={saving} style={{width:"100%",padding:"14px",background:"#6B1A2A",color:"#C9A84C",border:"2px solid #C9A84C",borderRadius:"8px",fontSize:"1rem",fontWeight:"700",cursor:saving?"not-allowed":"pointer",opacity:saving?0.7:1}}>
          {saving ? "Submitting…" : "Submit Referral →"}
        </button>
        <p style={{color:"#d4a0a0",fontSize:"0.8rem",textAlign:"center",marginTop:"12px"}}>
          Kingdom Avenue Inc. · Englewood, Chicago · kingdomavenuechicago@gmail.com
        </p>
      </div>
    </div>
  );
}

// ── ROUTER ────────────────────────────────────────────────────────────────────
export default function App() {
  const isStaff = window.location.pathname === "/staff" || window.location.pathname.startsWith("/staff/");
  if (!isStaff) return <PublicIntake />;
  return <StaffApp />;
}

function StaffApp() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem("kk_auth") === "true");
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [view, setView] = useState("intake");
  const [referrals, setReferrals] = useState([]);
  const [partners, setPartners] = useState([]);
  const [navigators] = useState(SEED_NAVIGATORS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let refSub, partnerSub;
    (async () => {
      const savedRefs = await load("kk_referrals", []);
      const savedPartners = await load("kk_partners", SEED_PARTNERS);
      setReferrals(savedRefs);
      setPartners(savedPartners.length ? savedPartners : SEED_PARTNERS);
      setLoading(false);

      // Subscribe to real-time changes from other navigators
      refSub = await subscribeToKey("kk_referrals", (val) => setReferrals(val));
      partnerSub = await subscribeToKey("kk_partners", (val) => setPartners(val));
    })();
    return () => {
      if (refSub) supabase?.removeChannel(refSub);
      if (partnerSub) supabase?.removeChannel(partnerSub);
    };
  }, []);

  const saveReferrals = async (refs) => { setReferrals(refs); await save("kk_referrals", refs); };

  const handleIntake = async (ref) => { await saveReferrals([...referrals, ref]); };

  const handleUpdate = async (updated) => {
    const refs = referrals.map(r => r.id === updated.id ? updated : r);
    await saveReferrals(refs);
  };

  const overdueFUCount = referrals.filter(r =>
    r.followUps?.some(f => !f.completedDate && daysUntil(f.dueDate) < 0)
  ).length;

  const urgentCount = referrals.filter(r => r.urgency === "urgent" && r.status !== "completed").length;

  const navItems = [
    { id: "intake", icon: "📥", label: "New Intake", section: "navigator" },
    { id: "dashboard", icon: "📊", label: "Dashboard", badge: urgentCount > 0 ? urgentCount : null, badgeCls: "warn", section: "navigator" },
    { id: "followups", icon: "📅", label: "Follow-Up Tracker", badge: overdueFUCount > 0 ? overdueFUCount : null, section: "navigator" },
    { id: "partners", icon: "🤝", label: "Partner Directory", section: "resources" },
    { id: "export", icon: "⬇", label: "Export & Reports", section: "resources" },
  ];

  const titles = {
    intake: ["New Referral Intake", "Submit a new family or CPS school referral"],
    dashboard: ["Navigator Dashboard", `${referrals.filter(r => r.status !== "completed").length} active referrals`],
    followups: ["Follow-Up Tracker", "Monitor and log all cadence check-ins"],
    partners: ["Partner Directory", `${partners.length} partner organizations`],
    export: ["Export & Reports", "Download data for CPS reporting and funders"],
  };

  const handlePin = () => {
    if (pin === "9195") {
      sessionStorage.setItem("kk_auth", "true");
      setUnlocked(true);
      setPinError(false);
    } else {
      setPinError(true);
      setPin("");
    }
  };

  if (!unlocked) return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100vh",background:"#1a0a0f",fontFamily:"'DM Sans', sans-serif"}}>
      <div style={{background:"#2a0a12",border:"2px solid #C9A84C",borderRadius:"16px",padding:"48px 40px",textAlign:"center",maxWidth:"360px",width:"90%"}}>
        <div style={{fontSize:"2rem",marginBottom:"8px"}}>👑</div>
        <div style={{fontFamily:"'Playfair Display', serif",color:"#C9A84C",fontSize:"1.5rem",fontWeight:"700",marginBottom:"4px"}}>Kingdom Konnect</div>
        <div style={{color:"#d4a0a0",fontSize:"0.85rem",marginBottom:"32px"}}>Navigator Portal · Kingdom Avenue Inc.</div>
        <div style={{color:"#e8c5c5",fontSize:"0.9rem",marginBottom:"12px"}}>Enter your access PIN</div>
        <input
          type="password"
          inputMode="numeric"
          maxLength={6}
          value={pin}
          onChange={e => { setPin(e.target.value); setPinError(false); }}
          onKeyDown={e => e.key === "Enter" && handlePin()}
          placeholder="••••"
          style={{width:"100%",padding:"12px",fontSize:"1.5rem",textAlign:"center",borderRadius:"8px",border:pinError?"2px solid #e05555":"2px solid #6B1A2A",background:"#1a0a0f",color:"#C9A84C",letterSpacing:"0.5em",outline:"none",boxSizing:"border-box",marginBottom:"8px"}}
          autoFocus
        />
        {pinError && <div style={{color:"#e05555",fontSize:"0.85rem",marginBottom:"8px"}}>Incorrect PIN. Try again.</div>}
        <button onClick={handlePin} style={{width:"100%",padding:"12px",background:"#6B1A2A",color:"#C9A84C",border:"none",borderRadius:"8px",fontSize:"1rem",fontWeight:"600",cursor:"pointer",marginTop:"8px"}}>
          Enter
        </button>
      </div>
    </div>
  );

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", fontFamily: "'DM Sans', sans-serif", flexDirection: "column", gap: 12 }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: B, fontWeight: 700 }}>Kingdom Konnect</div>
      <div style={{ color: MUTED, fontSize: 13 }}>Loading system…</div>
    </div>
  );

  const sections = [...new Set(navItems.map(n => n.section))];

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <aside className="sidebar">
          <div className="sidebar-logo">
            <h1>Kingdom Avenue Inc.</h1>
            <p>Englewood, Chicago</p>
            <div className="kk-badge">Kingdom Konnect</div>
          </div>

          {sections.map(sec => (
            <div key={sec} className="nav-section">
              <div className="nav-label">{sec === "navigator" ? "Navigator Tools" : "Resources"}</div>
              {navItems.filter(n => n.section === sec).map(n => (
                <div key={n.id} className={`nav-item ${view === n.id ? "active" : ""}`} onClick={() => setView(n.id)}>
                  <span className="nav-icon">{n.icon}</span>
                  {n.label}
                  {n.badge > 0 && <span className={`nav-badge ${n.badgeCls || ""}`}>{n.badge}</span>}
                </div>
              ))}
            </div>
          ))}

          <div className="sidebar-footer">
            <div style={{ fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>Kingdom Avenue Inc.</div>
            <div>EIN: 83-0531517</div>
            <div>CPS Vendor #47244</div>
            <div style={{ marginTop: 8, color: "rgba(201,168,76,0.8)", fontWeight: 600 }}>Danielle Wallace</div>
            <div>Executive Director</div>
            <div style={{ marginTop: 4 }}>kingdomavenuechicago@gmail.com</div>
          </div>
        </aside>

        <main className="main">
          <div className="topbar">
            <div>
              <h2>{titles[view][0]}</h2>
              <div className="topbar-sub">{titles[view][1]}</div>
            </div>
            <div className="topbar-actions">
              {view !== "intake" && <button className="btn btn-gold btn-sm" onClick={() => setView("intake")}>+ New Intake</button>}
            </div>
          </div>

          <div className="page">
            {view === "intake" && <IntakeForm navigators={navigators} partners={partners} onSubmit={handleIntake} />}
            {view === "dashboard" && <Dashboard referrals={referrals} navigators={navigators} partners={partners} onUpdate={handleUpdate} />}
            {view === "followups" && <FollowUpTracker referrals={referrals} navigators={navigators} onUpdate={handleUpdate} />}
            {view === "partners" && <PartnerDirectory partners={partners} setPartners={setPartners} />}
            {view === "export" && <ExportView referrals={referrals} navigators={navigators} partners={partners} />}
          </div>
        </main>
      </div>
    </>
  );
}
