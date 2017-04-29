---
layout: work
device: phone
title: "Live Scoreboards and Results"
date: 2016-11-02T09:48:31+00:00
tagline: "Creating a beautiful and responsive frontend to live aquatic events"
excerpt: "<p>At The ASA and British Swimming, we had many swimming events that we wanted to show results for directly on the swimming.org site.</p><p>This post looks at how was able to take large quantities of tabular data and make it responsive and accessible.</p>"
category: work
bgcolor: "light-blue"
image:
  show: true
  cap: /img/results/main.jpg
---

At The ASA and British Swimming, we had many swimming events that we wanted to show results for directly on the swimming.org site. The results service was provided by the volunteers at SportSystems, and displayed on [www.swimmingresults.org.uk][1]. They did all the work at the venue to capture the swimming results, using many legacy systems based on Visual Basic. Unfortunately as volunteers they didn't have a lot of time to spend to help us get the results onto our site.

Here's how their startlists looked,

<figure>
  <img src="/img/results/before/startlists.jpg" alt="UI showing SportSystems full version of startlist for Women’s 100m Butterfly" class="oldstyle">
  <figcaption>Start list for Women’s 100m Butterfly. You can see tables don’t align, making it harder to scan the data. It also doesn’t scale down to mobile.</figcaption>
</figure>

and here's a results page.

<figure>
  <img src="/img/results/before/results.jpg" alt="UI showing SportSystems full version of results for Women’s 800m Freestyle" class="oldstyle">
  <figcaption>Results for Women’s 800m Freestyle. The split times span multiple rows.</figcaption>
</figure>

Fortunately, they were able to give us access to the results, by simply adding a CORS header to their server. This enabled me to be able to pull in any of their start lists and results files by XHR.


## Responsive tables

Getting the tables to work well at all screen sizes took a lot of iteration. Responsive tables are tricky. Here's some of the things I tried:

### Using `overflow-x: scroll;` below a certain breakpoint.

The tables were optimised for the desktop site, using fixed width columns. Below a breakpoint if the content was too wide for the viewport then table could be scrolled horizontally to view the rest of the data. This enabled access to the data at a legible font size. But each table could be a different width depending on the data (e.g. length of club names). Some would scroll, and anothers wouldn't need to, and it was kind of messy scrolling individual tables.

### Adjusting the font size

By adjusting the font size at several breakpoints I could make the data fit well at all sizes. I used shading on alternate rows to contrast them. But it was overly fiddly, and didn't feel right in the context of the site. Also, some names would flow on to a second row, which broke the vertical rhythm.

<figure>
  <img src="/img/results/masters/desktop.jpg" alt="Men’s 200m IM on the Master’s site on desktop">
  <figcaption>Men’s 200m IM on the Master’s site on desktop.</figcaption>
</figure>

This felt too messy and insonsitent.

<figure>
  <img src="/img/results/masters/phone.jpg" alt="Men’s 200m IM on the Master’s site on mobile">
  <figcaption>Men’s 200m IM on the Master’s site on mobile. The font size was really small. To fit the club on it had to go on a new row. You can see at Pos 3 it flows on to a 3rd row. The columns aren’t consistent widths across events or between start lists and results.</figcaption>
</figure>

On tablet the the content became sparse.

<figure>
  <img src="/img/results/masters/tablet.jpg" alt="Men’s 200m IM on the Master’s site on tablet">
  <figcaption>Tablet view - viewport with 720px width.</figcaption>
</figure>

## The solution

Content would wrap on to two lines if there was a long athlete name or club. To stop this happening I combined them into a single column at all screen sizes. At larger sizes I used a single row, with the club name in slightly smaller, grey text. All rows are single line. `overflow: ellipsis` is used in the rare cases of a long club name and long athlete name, with a `title` attribute added to the club name so that it will show on hover.

<figure>
  <img src="/img/results/after/desktop.jpg" alt="Women’s Open 100m Butterfly heats on desktop">
</figure>

To stop the content feeling too sparse on tablet, I added a `max-width` to the table and centred it. It makes scanning the results much easier.

<figure>
  <img src="/img/results/after/tablet.jpg" alt="Women’s Open 100m Butterfly heats on tablet">
</figure>

There is a single breakpoint that changes the font size to be slightly smaller on mobile, and puts the club name on to a new row. Each result has consistent vertical spacing, making it easy to search for results while scrolling the page.

<figure>
  <img src="/img/results/after/phone.jpg" alt="Women’s Open 100m Butterfly heats on mobile">
</figure>

I was also able to make the table columns spacing consistent accross events, and across start lists and results. It makes all the difference when browsing results that the content doesn't visually shift. To do this I used a combination of `width`s and `min-width`s. Each column was given a percentage-based width. Trial and error was used to find the minimum width of a numerical column, which can vary across events - short distance events may have shorter times than longer ones.

{% highlight css %}
.position {
  width: 10%;
}

.name {
  width: 55%;
}

.reaction-time {
  width: 12%;
  min-width: 4.1em;
}

.time {
  width: 15%;
  min-width: 5em;
}
{% endhighlight %}


## Controls

As shown in the screenshots above, I simplified the navigation from what was a sidebar on the swimmingresults.org.uk site to a single dropdown and toggle between start lists and results. I made the controls stick to the top of the viewport when scrolling down, to enable easy access when browsing. If the user toggles between start lists and results or changes events the page will smooth scroll back up to the top of the results.


## Live scoreboards

The live scoreboard also follwed the same design as described above. Columns line up across scorboard states (start list, in progress and result summary), and also line up with the results on the page below. Just to emphasise why this is important, here's [Christian Robertson][2] from [an excellent talk on design][3]: 

> This is the [principle] that I wish that people had told me on the very first day of design school. It's line stuff up. That's it. Everything should be lined up with something unless it has a good reason not to. So even if elements are at the very opposite sides of the screen and they're almost aligned, line them up. If we don't do it, then our subconscious brains are spending precious cycles trying to figure out, why are those things not lined up? Does it mean something? Does it not mean something? It's almost like... I'd compare it to a memory leak in your software, where something's going on, you're not exactly sure, but you're wasting your resources.


<figure>
  <img src="/img/results/after/scoreboard.jpg" alt="Demonstration of the live scoreboard">
</figure>

So that’s the scorebards and results. I was pretty happy with how clean, accessible and responsive I was able to make the results data. And also visually consistent with the [athlete profiles][4].

[1]: https://www.swimmingresults.org.uk "SportSystems"
[2]: https://twitter.com/cr64 "Christian Robertson on twitter"
[3]: https://youtu.be/iJDoxOTyMdk?t=31m17s "Advanced Design for Engineers"
[4]: /work/athlete-profiles/ "Athlete Profiles"
