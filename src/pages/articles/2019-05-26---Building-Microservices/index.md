---
title: Building Microservices by Sam Newman
date: "2019-05-26T00:00:00.000Z"
layout: post
draft: false
path: "/books/building-microservices/"
category: "Books"
tags:
  - "Software Engineering"
  - "Software Architecture"
  - "Microservices"
description: "Sam Newman shares his experience and thoughts about what is a good microservices architecture and what are the principles to keep in mind in order to successfully use it in your system."
---

<figure class="float-left" style="width: 240px">
  <img src="./building-microservices-cover.jpg" alt="Building Microservices cover">
  <figcaption>Building Microservices, Sam Newman</figcaption>
</figure>

## Summary

Probably one of the references on the microservices architecture topic, this book is a must read if you are considering implementing one or if you are already starting with one but want to validate ideas or get more insight about how to get it right and make it scale correctly.
It is rather high level in order to be technology agnostic and be able to cover most of the cases one might face, but it also provides some references to get more in detail in applied insight if you face specific issues.

The range of topic is rather wide, most of them being rather technical but the human and organizational aspect of it is not forgotten.
From how to decide where to split services, to how to deal with service discovery between them while going through how to ensure people will be onboard with the changes brought by this new architecture and what tool to provide to make them comfortable with it.

## Detailed Summary

### 1- Microservices

One of the main characteristic of a microservices architecture is its capacity to enable and support diversity or heterogeneity.
This applies to about any aspect of the services you can think of, technology used, scale, deployment frequency and pipeline, size, complexity.
For each domain your system contains, you can try to adopt the specific best solution for solving the problems you face.
Another one can be summarized as independence.
It brings both resilience, as a failure in one system can more easily be contained, and really different ways to structure the teams and working method around these services.

They are in several ways superiors to shared libraries or modules due to these.
But they are no magic solution to everything either and they do come with they own set of problems.
So do consider if they are the right solution for your system.

### 2 - The Evolutionary Architect

Software Architect is a rather misleading term due to the comparison it implies with (Building) Architects.
Architects plans are for long lasting, hard to change buildings which once built are not meant to be updated that often.
In software, releasing a system is just the beginning as it will then need to keep evolving as business requirements change, users expectancies change and bugs are found.

The role of the Software Architect is then not to draw in details the whole system, that will be much better done by specific teams with more specialized domain knowledge.
The Software Architect should be compared more to a City Planner.
They should take the high level decisions which allow the teams to build their specifics parts of the system in an harmonious way and with as much ease as possible.
The architect should then only jump in in case of clear breaking of the agreed rules by one team or another.
In order to make this easier and more reliable, try to enforce any decisions through some automated tooling or code analysis; otherwise it is too easy for some mistake to slip through and then be copied over and become the example everyone follows.

The responsibilities of the architect as defined here are centered around the Technical Vision.
But to succeed, they need the following characteristics:

- Empathy: to understand how the vision impacts other teams.
- Collaboration: to get the inputs needed to refine the vision.
- Adaptability: to make the vision evolve.
- Compromise: to find the right balance between standards and teams autonomy.
- Governance: to ensure the implementation of the vision.

### 3- How to Model Services

The main two characteristics to keep in mind when looking how to define a service are **loose coupling** between separate services and **high cohesion** within one service.

One useful way to look at it which matches usually these characteristic is with the idea of _bounded contexts_ or _domains_.
If you're not fully sure yet about a separation, one good way to experiment before going for a hard split can be using modules inside the same service.
Another indication can be if there is the feeling that one service is too big, though in itself it could just indicate a complex domain, so try to dig more about what can cause this feeling or justify a split.

### 4- Integration

Microservices will cause the number of integration points to proliferate in your architecture.
That can become an issue if you treat these with the care they should get.
There is no magic protocol or technology here but some good principles to keep in mind.

Keep your API as agnostic(/dumb) as possible.
Both from the technology and from the internal of your services.
That obviously rule out a shared database as a good way to integrate.

Asynchronous integrations can be very powerful but don't underestimate the complexity they can bring in reasoning about your system or debugging it (to that matter, keeping a correlation ID around can help).
Keep the unavoidable middleware as dumb as possible and the logic in your services.
One interesting concept is _choreography_ rather than _orchestration_.
With the later, one central service calls other services in order to fulfill a process, but it can become too much of a _god service_ assuming too much responsibilities.
With the former, that service just sends information about what has happen or what needs to happen.
The other services then need to know their part of the choreography and act accordingly when receiving this information.

Remote Procedure Calls (RPC) are not bad per say, but their format can easily encourage treating them like normal function calls, while they have all the complexity and potential failure causes any remote call has.
So a clear REST/HTTP call here can encourage better safety measures and so more robust integrations.

You want your API to break as rarely as possible, if you think it through and execute the changes as small independent steps in the right order between the called and calling services, you will realize most changes don't need to be breaking.

> Postel's Law: Be conservative in what you do, be liberal in what you accept from others.

For when it can't be avoided, versioning is the way to go.
But be wary of keeping older versions around for too long, supporting 2 versions for a transition period is fine, 3 or more means you're paying a higher price than you should in maintenance.
Client libraries can help managing the integration and the changes (breaking or not), but they can backfire if you start putting there some logic which is more core to the service.
Always think about them as if they were built by external users not knowing the domain.

Integrating with frontends, make sure too keep the frontends logic about display and customer experience.
One good way to think about it is to think what would be duplicated if you had several frontend clients, even if you have only one (usually web).
Backend for frontends can be a good way to gather data from several sources in order to reduce the overhead for the client, but don't necessarily try to have a one size fit all there.
Otherwise this service is at risk to end up having too much logic.
It might be better having one backend for frontend per client, even if that implies some duplication between them.

Protect your integrations with external services so that they are easily replaceable and that customization is in your control.
Then other services in your system would talk to the service you have which integrate with the third party.

### 5- Splitting the Monolith

Probably the best way to approach splitting a big codebase is to identify the bounded context within it that you find relevant to be their own services, refactor them to be separate packages or even modules and then, finally start extracting them.
You can get started by the pieces which will provide the most value or by the ones which seem the least entangled with all the rest of the code in the monolith.

Of course, this is the simple, high level view.
And all that get more complicated in the details.
Is a database currently shared between two domains that you would see as two services?
Is reporting relying on all the database tables being in one place to join it all?

But overall the same high level approach can be followed, identify the issues and boundaries; refactor and split in place (getting your data from another service through "API" calls even if not fully "remote"); extract and deploy the new service.

Around reporting there are several ways to deal with it depending your specific requirements, but overall because it's likely there will be some more or less formal contract between the data and the report generation, it's recommended that the team responsible of the service and data is the one responsible with making the data available for reporting.
Of course it could be using tools, processes and standards made available by a specific data team, but they are the best ones to know about breaking changes in their data and propagate it where needed.

### 6- Deployment

If you want to take advantage of the benefit microservices can bring to your workflow and productivity, one of the main conditions to fulfill around deployment is probably to keep the microservices's deploy independent from one another.
One straightforward way to achieve this is to have one repository per microservice, this will force you to have one CI build for each of them and they will be triggered independently.
Though, if for some reasons, having several services in one repository makes your workflow easier, it can be fine as long as they keep independent CI builds.
As usual with grouping things though, there is more risk of coupling (here with the builds) without fully realizing it.

Independent build should allow you to deploy small, often and fast.
That should be one of your goal in order to be able to iterate fast and identify errors sooner and more easily.

One thing which can be necessary or at least helpful regarding this is to make sure to have a deployment tool or process as easy to use as possible, which likely means as automated as possible.
You'd pretty much want to be able to deploy any version of any service in any environment anytime.
Make sure the rollback case is handled as well!
Overall make sure the developers are comfortable with and confident in the build and deploy tools, if not, they will be reluctant to deploy as often as you want them to.

About where these services are deployed, it is preferred to have one service per host or container.
This has been made much easier and more standard lately thanks to Docker though.
To this extent consider treating your infrastructure as immutable and reproducible by having it version controlled with a tool like Terraform for example and to automate the scheduling of your containers with a tool like Kubernetes for example.

### 7- Testing

There are plenty of different names and even more meanings associated to each of these names to describe the usual test pyramid.
But overall the ideas are that you'd want different categories of tests with different goals and requirements.
At the bottom you want a lot of automated unit tests, they are meant to be written by the developers as they develop with the goal to help them do their job faster and with better confidence in the quality of the work.
What exactly is a unit can be discussed pretty much endlessly...
But something small and isolated (usually by mocking or stubbing other components it might interact with).

Above them, you have some slightly bigger scope, still automated tests, commonly called service tests or integration tests.
They will be slower as they require the service your working on to be started or at least a meaningful part of it.
They might deal with a local version of the storage used by the service, tests its integration points using stubs of other services, check the API of this service.
Overall they start touching at more meaningful actions you expect the service to achieve or features (but in a technical way) it should provide.

On top of these are the mysterious end to end tests.
They might be the ones with the wider range on meaning and implementation.
The overall goal is to test high level user journey and business features.
You want to know you can still provide the service you're providing to customers.
These tests might run over several services, sometimes in a specific environment...
Obviously that means a lot of problems around what version was tested, how heavy it is to run, how reliable it is to run, etc.
With these ones you might even get away with some automation for some time if you can afford someone manually checking things once in a while, but automation is a good investment to take it to a next level and make it more future proof.
Indeed, if you probably want to keep the number of these tests rather small, they will still grow over time as you want to cover more flows and cases.
Keep in mind the trade off between adding some coverage there and the loss of convenience if they become too slow.

One idea which to help keep the number of end to end tests under control is to invest in Consumer Driven Contract (CDC) tests, they ensure that the contract between two services is not broken, mitigating the risk of inter-service issues.
With that extra confidence you might be able to limit the end to end ones to a very small amount or even more or less get rid of them.

If your business permits it, consider as well "testing in production" to some extent.
Either with canary releases or simple rolling deploys with easy rollback available.
It will allow you to leave the Di of edge cases to customers rather than spending lots of time thinking about it to still miss some in the end.

### 8- Monitoring

Different kind of metrics might have different requirements but current levels of tooling mostly allow you to push your tech and business metrics through the same pipeline, and sometimes even logs.
Do consider it, as it can reduce the maintenance overhead quite a bit.

On top of this kind of capabilities, make sure the tools you pick allow easy querying and visualization of the metrics as otherwise they will likely not be used.
Also make sure the data is kept long enough so you can evaluate the normal state of your system and see patterns emerge.
That can both help for problem detection and capacity planning.

Also make sure the metrics can be identified correctly at different levels, instance, service, system.
Usually this works through some kind of tagging, but whatever the way it is needed to help you identify quickly the actual cause of an issue and its scope (specific to one instance? one physical host? ...)

In terms of tech metrics, do not skip through basics host level ones like CPU or memory usage.
They end up bitting back still quite often.
Then make sure to have decent visibility on most "timings", response time of one service, response time of its downstream links, delay of queues, etc.

Business level metrics will obviously be more specific to your use-cases but don't feel restricted around them, if done properly they should be usable for a wide range of reporting or quick insight in business performances as well.
In case of doubt it's usually better to publish a metric rather than not.

Do invest time in standardizing your logs and metrics between services or risk to have a much higher maintenance cost around the tools for that.
And consider linking logs through correlation IDs to make them even more powerful and ease digging down a chain of events.

### 9- Security

As always with security, basic common principles apply.
Don't try to implement your own version of some protocol or algorithm and use wildly used, tested and fixed versions.
They exist in all languages and will give you much better confidence and probably even performance than what you'd do yourself in any reasonable time.
It's typically one of these topics which is necessary to deal with but also doesn't provide any added value to your business compared to competitors (assuming they do the needful as well), so why would you want to invest time and resources in any custom solutions if you have free relevant libraries available.

One area which is not much different from a monolith situation is securing the edge of your system.
You'd want to limit access to expected type of requests and traffic and keep the exposure area as small as possible.
Think about having a firewall, making sure unnecessary ports are closed if relevant, ...
If you do need to give some kind of admin access to some staff, do try to limit its power as much as possible while allowing them to do their job.

One main new topic compared to a monolith is how should communication between service be treated.
And as often, this is likely to depend your specific case, and more specifically the sensibility of data handled or actions handled by each service.
Overall you'd want some kind of security between services as you can assume over time someone will manage to break the security at the edge of the system.
But some part might definitely require it more than others.
The choices are varied: certificates, API keys, service accounts restricting what one service can do, propagating customers credentials, some business logic assessing one customer accesses only relevant and allowed data for them and not others'.

Don't forget to make sure you data at rest is also secured, and when possible store the minimum amount of sensitive data for long times...
Think about your databases, their backups, any kind of hosted long term storage like S3 buckets or equivalent.

Do make sure as well to have enough logging or monitoring (mostly around accesses) to be able to assess the scope of a security breach.
Probably worse than having a breach is not being able to see it has been used and to what extent.
You can also consider external services to evaluate or test your security (with pen tests for example).

### 10- Conway's Law and System Design

> Conway's Law (Melvin Conway, April 1968): Any organization that designs a system (defined more broadly here than just information systems) will inevitably produce a design whose structure is a copy of the organization's communication structure.

Depending on the cases, it can look like the Conway's law is true or rather that the relationship is reversed.
What is almost always true though, is that the architecture of the teams and the one of the systems impact each other.

There is no one perfect solution for any of these two topics and they are always very dependent on the context like size of the company, external constraints, state of the growth, etc.
Even if the microservices architecture and the small cross functional teams which seem to go so week with it are very trendy, they don't fit all situations and some subtle variations in their implementation can end up in big changes in the final result.
Moreover, it's quite likely some new trend will shake things up in this area sooner rather than later.

The main point is that whenever one of the two structures (system or teams) is considered for a change, it should not be considered in isolation, but with consideration as well for the other side of the picture.
For example if your changing your architecture or your deployment pipeline.
Do you have enough people to support the change?
Are people adapting fast enough to the change or should it be more progressive?
If your changing a team, does it out any part of the system at risk of lack of ownership or resources?

> The Second Law of Consulting (Gerry Weinberg): No matter how it looks at first, it's always a people problem.

### 11- Microservices at Scale

Microservices can allow a more controller scaling than monoliths, but they also bring with that a wider range of issues.
Firstly they rely even more heavily on the network, which is a well known cause of instability and failures.
Then, any source of failure present in one service is now present N times in your system, with potential variations about what is the best way to mitigate it due to various requirements.

One of the main principles, as described as well in [Release It!](/books/release-it), is to isolate the failures so that one service going rogue doesn't have to mean other services will suffer.
Obviously they might lose the feature provided by this service, but they could overall remains available.
Always put in place *timeouts* on remote calls and consider strongly *circuit breakers* and *bulkheads*.

On scaling, use the independence of services wisely, maybe only some services need to scale, or maybe they don't all need to scale in the same way.
Analyzing the details for each case can both save you money and trouble by keeping some services as simple as possible.
It's probably even more true around database as different technologies can result in quite different scaling and management cost.
Consider what technology can lead you further and maybe changing for this one before going for advanced techniques like sharding which can easily be done poorly.
Autoscaling is useful if you have to face varying loads, and even more unpredictable ones.
Take precautions and be sure to have loads tests in a test environments to be able to validate the behavior of the scaling before production.

Caching can be used to mitigate the need for scaling as in some cases it can help reduce a lot the traffic to one service and also then improve the performances of the upstream services relying on it.
Though as well known, caching is one of the hard things to do in software development, it's easy to get hit back by stale data at some point or miss some edge cases if the cache chain is complex.
Do use it, but try to keep it as simple as possible and only where it really makes a difference.
There is no point trying to cache everything.

The CAP theorem proves that you can only get 2 of the these three characteristic for a system: Consistency, Availability and Partition tolerance.
Realistically, for a distributed system, Partition tolerance is not an option, so you're left to pick between dropping Consistency or Availability.
Which one makes more sense will strongly depend, again, on your specific use-cases.
You need to go through what is the worst which can happen is one service is not available for some time or if you serve slightly out of date data.
One important point is that you don't have to make the same choice for all parts of the system, again the diversity is one of the power of a microservices architecture.

With so many services, you will need to know where to go to call any of them.
You can rely on the good old DNS record for that, but that can quickly become error prone with the number of services increasing and their likelihood of moving around as well.
There are quite good service discovery tools or library that you should consider to automate a bit this process and make sure it is always up to date.
It's probably not worth building your own solution for it unless you have some very specific requirements which don't fit with any of them.

With all communication between services happening over APIs, this is both a good incentive and a necessity to provide documentation.
Per say the documentation could be useful even inside a monolith, between some different part of it, but having an API seem to encourage people more to provide it.
Make sure to use standard tools to reduce the overhead of adding documentation as much as possible and make it live with the code.
It is its best chance to stay up to date.

### 12- Bringing It All Together

Overall, the high level main principles to keep in mind in order to build a successful microservices architecture are the following:

- Model Around Business Concepts
- Adopt a Culture of Automation
- Hide Internal Implementation Details
- Decentralize All the Things
- Independently Deployable
- Isolate Failure
- Highly Observable
