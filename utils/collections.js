function getInstutionCollection(institutions, experiences) {
  const institutionWithExperiences = institutions.map((institution) => {
    const experiencesAtInstitution = experiences.filter(role => institution.data.title === role.data.institution)
      .sort((a, b) => parseInt(b.data.end_date, 10) - parseInt(a.data.end_date, 10));

    institution.data.end_date = experiencesAtInstitution[0].data.end_date;
    institution.data.experiences = experiencesAtInstitution;

    return institution;
  });

  institutionWithExperiences.sort((a, b) => new Date(b.data.end_date) - new Date(a.data.end_date));

  return institutionWithExperiences;
}

export function employers(collectionApi) {
  const employers = collectionApi.getFilteredByTag("employers");
  const jobRoles = collectionApi.getFilteredByTag("job_roles");

  return getInstutionCollection(employers, jobRoles);
}

export function educators(collectionApi) {
  const educators = collectionApi.getFilteredByTag("education");
  const courses = collectionApi.getFilteredByTag("course");

  return getInstutionCollection(educators, courses);
}

function getWorkCollection(collectionApi, institutionNames, titles = null) {
  const work = collectionApi.getFilteredByTag("work");

  if (!titles) {
    return work.filter(post => institutionNames.includes(post.data.work_for)).reverse();
  }

  return work.filter(post => institutionNames.includes(post.data.work_for) && titles.includes(post.data.title))
    .reverse();
}

export function top_magpie_work(collectionApi) {
  return getWorkCollection(collectionApi, ["Magpie Technology"])
}

export function top_a_dozen_eggs_work(collectionApi) {
  return getWorkCollection(collectionApi, ["a dozen eggs"], ["Helter Skelter", "Fitter 365", "Charnwood Brewery", "Memo"]);
}

export function top_asa_british_swimming_work(collectionApi) {
  return getWorkCollection(collectionApi, ["The ASA", "British Swimming"], ["Off the Blocks", "Athlete Profiles"]);
}

export function top_university_work(collectionApi) {
  return getWorkCollection(collectionApi, ["Loughborough University"]);
}
