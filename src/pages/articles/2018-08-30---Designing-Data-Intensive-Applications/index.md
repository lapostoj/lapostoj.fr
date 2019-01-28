---
title: Designing Data Intensive Applications by Martin Kleppmann
date: "2018-11-23T00:00:00.000Z"
layout: post
draft: false
path: "/books/designing-data-intensive-applications/"
category: "Books"
tags:
  - "Software Architecture"
  - "Software Engineering"
  - "Databases"
description: "Martin Kleppmann goes in depth about the challenges you're likely to face if you want to build an application relying in an important way on data. He also mentions most of the currently available options to solve these challenges."
---

<figure class="float-left" style="width: 240px">
  <img src="./designing-data-intensive-applications-cover.jpg" alt="Designing Data Intensive Applications cover">
  <figcaption>Designing Data Intensive Applications, Martin Kleppmann</figcaption>
</figure>

## Summary

Lately, data is at the core of more successful application, or at least web application. If you're building or improving one, you're likely to face challenges faced by other companies at a different time. This book is pretty much a collection of the latest state of the art about this topic.

It doesn't pretend to go in depth about all the topic mentioned but it gives you the knowledge of the different options and their main upsides and downsides to allow you to investigate more in depth in the right direction given your own set of constraints.

## Detailed Summary

## Part 1 - Foundations of Data Systems

### Chapter 1

Reliability, scalability and maintainability

### Chapter 2 - Data Models and Query Languages

Exploration of the different types of databases, relational vs noSQL based (with distinction between document and graph structure). Good introduction to/overview of graph structure for someone without much knowledge about it before.
Documents limited for one to many and many to many use-cases. Lately some convergence between SQL and documents with JSON support in SQL and support for join in some document based DBs.
Distinction between imperative languages and declarative ones. Overall declarative are much more powerful by delegating the details of the implementation to the software your using giving you more time to care about your own application and business value. (Examples SQL, CSS).

### Chapter 3 - Storage and Retrieval

- Log appending db
- Sorted String Tables (SSTables)
- Log-Structured Merge-Tree (LSM-Tree): `Cassandra, LevelDB, ...`
- B-Trees

Write amplification, when one write forces the db to re-write several pages (at least partially) in order to re-balance a tree structure for example.
Different structures lead to different exposure to fragmentation on the disk, to take into account both in terms of read performance and with the disk characteristics.

Index
Using heap files Vs clustered index (row stored directly within the index)
Compromise of the 2: covering index (index with included columns) store only part of the row within the index
Concatenated index on several columns

Read about: R-Trees: specialized spatial indexes

Part about databases for data warehousing usage
Column oriented storage

### Chapter 4 - Encoding and Evolution

_Encoding_ (serialization, marshaling): from in memory to byte representation which is persisted

_Decoding_ (parsing, deserialization, un-marshaling)

Language specific ones are usually not the best + coupling to the language. Prefer JSON, XML and binary.

Several binary encoding of JSON are available: `MessagePack, Thrift, Protocol Buffers, Avro`

Different properties in term of evolvability, support of nested arrays, specific gain in term of size, handling of backward (new code can read old data) and forward (old code can read new data) compatibility. Necessary for rolling upgrade or deployment. Schema based approaches.

Same for databases, RPC/REST or asynchronous messaging

## Part 2 - Distributed Data

### Chapter 5 - Replication

Single leader, multi leader and leaderless replication.

Synchronous Vs asynchronous replication.

Synchronous usually means one replica synchronous and the rest asynchronous to prevent too many possibilities of one replica affecting the leader's performance.

Leader based replication = active passive replication = master slave replication.

Fail-overs strategies

Replication implementations
Statement based replication - hard to guarantee same order of execution.
Write ahead log (WAL) shipping (Postgres, Oracle) - couples to storage format which can make upgrade require downtime
Logical (row based) log replication (MySQL has it as an option)
Trigger based replication - execute application code on changes; more flexible but greater overhead and less reliable

#### Read your writes guarantee

With asynchronous replication the user experience can suffer. If abuser write something on the leader and expect to see it straight away but is served by a follower it will look like nothing happened. One strategy is serving user's own info from master and other users info from followers (works well with social media for example). Of anything can have been modified by the user, other criteria can be used (timestamp or id of last change for example)

#### Monotonic reads guarantee

Guarantee that the user won't see older data after having seen newer one (could happen in case of querying a follower with greater lag.

#### Consistent prefix read

Guarantee that writes are seen in the order they have occurred.

#### Multi leader replication

To avoid if possible due to complexity of resolving conflicts (plus issues with some features from DBs like auto increment).
Interesting parallel with offline work of an application and shared editing of documents.

#### Leaderless replication

Based mostly on quorum, making sure that a given number of instances get the writes (w) and provide values for reads (r) to gain confidence in which value to use. If w+r > n (number of instances) we can be sure there is an overlap and the value provided will always be correct, unless some writes happen outside of the n considered nodes can be used in techniques for higher availability).

Detecting concurrent writes:

- Last write wins
- Happens before: identify if one operation is dependent on the other to conclude the second one must have happened before.

### Chapter 6 - Partitioning

One of the main complexity of partitioning is keeping the load evenly distributed across nodes (avoiding hot spots and skew).

One technic is based on hashing to evenly distribute any kind of value, but it can affect range queries...

#### Partitioning secondary index by document (aka object)

Each partition keeps local secondary index.
But then it can be hard to guarantee all documents of a given criteria will be on the se partition, so the query needs to go to all partitions which can make it more expensive.
You can an also have a global index partitioned differently than the data, but writes are then more expensive. The secondary index has then to be updated asynchronously.

#### Rebalancing

Get much more partitions than nodes, that way changing the number of nodes is just about moving partitions from one now to another but not about changing the number of partitions
That makes it hard to get partitions of the right size for a long amount of time though...

### Chapter 7 - Transactions

ACID: Atomicity, Consistency, Isolation, Durability
Guarantees from most relational database (less in noSQL). To take with a grain of salt as every guarantee as they can be have quite different meanings...
In order to not to suffer performance degradation most databases don't actually serialize all actions but usually use weak isolation levels with different guarantees

#### Read committed

No dirty reads, no dirty writes
It allows read skew (non repeatable read due to inconsistent state: eg read A write A write Back read B)
A common solution to this is snapshot isolation (each query runs on a snapshot of the db as it was when the query started) for that the db can have to keep the state of objects at different points in time (multi version concurrency control MVCC)
Snapshot isolation is sometimes called repeatable read but overall this term is used for a wide range of guarantees so it is hard to know in a given case what it actually provides

Lost updates (eg 1 select A, 2 select A, 1 write A, 2 write A update of 1 is lost)

Atomic write operations

Most db support in place update which prevents the read modify write process. If your operation can be expressed in that way it's likely the best solution.

#### Explicit locking

Can be easy to forget somewhere...

#### Detecting lost updates

Another way is to let lost updates happen but detect them and abort the transaction which would suffer from it.

#### Write skew

When 2 transactions read objects and do an update on some of these (different ones on both sides). Some checks made when validating the changes are made on the same original data while one save will happens before the other and change the state. We would need to then lock the common row checked to prevent it.

To give better guarantee and serializability different techniques are used

#### Actual serial execution

To not give performance overhead requires short transactions

#### Two phase locking (2PL)

Most common one. Any write require an exclusive lock (not even another read lock can be there) while reads have shared locks.
So writers can block readers in that case.
Predicate locks are used for yet non existing values based on range queries. Alternatively index range lock (performs better).

#### Serializable snapshot isolation

Quite new but promising. Optimistic locking as opposed to pessimistic for 2PL. Execute the transaction and when about to commit a write, check if any risky situation has occurred.

Stale Multi Version Concurrency Control reads: when committing, db sees a write affecting the initial read (the premise) has happened => abort

Detecting writes affecting a read: similar to index range lock but with the lock being non blocking, just serving as an indicator when committing.

### Chapter 8 - The Trouble With Distributed Systems

This chapter is mostly a reminder about the things which should be kept in mind as potential failure in distributed systems. And not only as quite unlikely occurrences but as the actual context in which one operates.

The three main points are:

- Network delay or failures. Packages sent over the networks can get lost, delayed for an unbounded amount of time, reordered, ...
- Clock de-synchronization. Clocks on different systems can never be assumed to be synchronized, the differences between them can be mitigated by using NTP for example, but it will still exist.
- Processes can be paused. The reason can be from a "stop the world" pause from the Garbage Collector or Operating System to any other kind of pause. Modern implementations try to keep these pauses as short as possible, but they still happen.

All these can be solved or greatly mitigated, but usually at a cost which is too high to be worth in usual web systems (stricter constraints are found in aerospace for example or in some highly regulated financial ones).

With these issues, it can be hard to know exactly if something has happened, when and how. The truth is then defined by a consensus. If the majority of the nodes indicate the same, it will be what is considered true.

These can be abstracted a bit as system models:

- Synchronous model: all bounded network delays, bounded process pauses, bounded clock errors. Usually unrealistic.
- Partially asynchronous model: behaves like a synchronous system most of the time but can exceeds the boundaries.
- Asynchronous system: no assumptions is allowed on any timing. It can be considered there is no clock available (so no timeout).

And node models:

- Crash-stop faults: if a node fail it is by crashing, and it then doesn't recover.
- Crash-recovery faults: a node might fail and come back to a normal state by itself later on. The node would have lose any in-memory state but preserved stable storage one.
- Byzantine (arbitrary) fault: The node may do anything even trying to impact negatively the system on purpose.

The most realistic approach is usually close to a Partially asynchronous system with Crash-recovery faults nodes.

### Chapter 9 - Consistency and Consensus

#### Linearizability

(aka atomic consistency, strong consistency, immediate consistency, external consistency). It is essentially a _recency_ guarantee.
Make a system appear as if there were only one copy of the data and all operations on it are atomic even if in fact there are several replicas.
Example: if several reads are concurrent with a write, once one of them returns the updated value, all future ones must return that value as well.

Not to confuse with Serializability, linearizability doesn't solve any of the issues mentioned in the transaction chapter. One relationship exists between the two, serializability done with two-phase locking to actual serial execution provides linearizability as well. This is not the case for serializable snapshot isolation though.

Useful for locking and leader election, constraints and uniqueness guarantees, cross-channel timing dependencies.

What systems can be linearizable?

| Replication strategy      | Linearizable?                      |
|---------------------------|------------------------------------|
| Single leader replication | Linearizable under some conditions |
| Consensus algorithms      | Linearizable                       |
| Multi-leader replication  | Not linearizable                   |
| Leaderless replication    | Mostly not linearizable            |

Linearizability always comes with costs, first always one in performance and then either of availability, or consistency. That is why unless a strict requirement it might be best to not enforce it.

#### Ordering guarantees

The main meaning of ordering in database is causality ordering, meaning that if one action depends on another, it happens "after". One reason for that is because of the impossibility to rely on an universal time clock. But at least causality ordering allow us to always have data "which make sense" (e.g: a question is answered after being asked...).

Total order broadcast implies:

- reliable delivery: no messages are lost: if a message is delivered to one node, it is delivered to all nodes
- totally ordered delivery: messages are delivered to every nodes in the same order

Exactly what is needed for database replication. Can be used to implement a lock service with fencing tokens. You can build linearizable storage on top of total order broadcast (append a message, wait for your message, see if it's the first with the value you expected, append a new message to confirm).
The other way, you can also build total order broadcast on top of linearizable storage.

#### Consensus

Used for:

- leader election
- atomic commit

#### Two-Phase Commit (2PC)

It relies mostly on a coordinator (usually part of a library for distributed transactions). This coordinator will write on the different db nodes it needs and then send a "prepare" statement to all of them. Once a node answer OK to this statement it can't abort any more. Then the coordinator writes locally the decision (abort or commit) in case it itself crashes, and sends a "commit" statement to all nodes which finalize the commit.

2PC comes with performance overhead and relies heavily on the coordinator being up (causing potentially big delays otherwise), so it is not to use lightly.

Distributed transactions can be implemented either over clusters of the same database or between different technologies. X/Open XA (eXtended Architecture) is a standard for two phases commit across technologies.

It causes problems with locking though as transactions can end up taking forever (even literally) if a node involved crashes and that might need manual intervention to be solved.

- The coordinator can be a single point of failure if not highly available (often the case).
- The services then need to all be stateful (which transactions are they in) while stateless services are way easier to manage in term of deployment.
- XA is a more basic transaction than local ones as it cannot detect deadlocks nor work with Serializable Snapshot Isolation.
- Can amplify failures by making all parts broken if one part of the system involved in the transaction is broken.

Fault tolerant consensus

- Uniform agreement (safety): No two nodes decide differently.
- Integrity (safety): No node decide twice.
- Validity (safety): If a node decide value v, then v was proposed by some node.
- Termination (liveness): Every node that does not crash eventually decides some value.

Algorithms: `Viewstamped Replication (VSR), Paxos, Raft, Zab`.
They are all total order broadcast algorithm (operation on sequences of values) equivalent to repeated rounds of consensus.

Single leader replication is a total order broadcast, but still needs consensus to make sure the leader is chosen correctly. That is solved by an "epoch number" which identifies the "generation" of the leader, and a leader of a higher epoch number is always more legit than one with lower one.

Equivalent problems to consensus:

- Linearizable compare and set registers
- Atomic transaction commit
- Total order broadcast
- locks and leases
- Membership/coordination service
- Uniqueness constraint

## Part 3 -- Derived Data

A system of record is the source of truth for some data (usually normalized)
Derived data system are systems holding data in a potential transformed format. But if lost it can be recreated from the original source of the data (for example a cache). (Usually denormalized).

### Chapter 10 - Batch Processing

One popular technique for batch processing is MapReduce. It is used for example in Hadoop (in combination with HDFS: Hadoop File System).

The idea of MapReduce is rather similar to Unix commands. One MapReduce job takes some input, applies the Map task, sort the result and then applies the Reduce task which produces an output. This output can itself be the input of another job (like pipes in Unix).

The main difference is that MapReduce is built to take advantage of distributed system to perform, so the Map and Reduce tasks can be run in parallel between many nodes.

That brings similar issues to databases in term of how to split the input of each tasks between the nodes (example if you split by a given key, you will have to wait for nodes processing some "hot keys").

These jobs are mostly meant to have no side effect, they just take input and produce a result. That makes them easier to debug and replay as the new result can just take the place of the previous one if there was an issue with it. One difference with linux commands is that they take input from a file on the file system and output to a file as well. The input file is immutable and the output one always replaced one a new run.
For one job (or even task) to start it needs to wait for the full output of the previous one to be done.

To improve that a bit, some frameworks like `Spark, Tez and Flink` allow to create workflows directly. It allows several kind of optimizations like:

- Not needing a Map step before any Reduce one but just have _operators_ which can be linked together in arbitrary order.
- Not having the sort always applied after the Map step but just applying your own sorting whenever it is relevant.
- Not persist the output of all jobs in the file system. Though that can make fault tolerance more expensive and can still be valuable if the output is rather small.
- One operator can start processing data from the output of another before the output is complete (if it doesn't need the whole data set to do its job like it would be for sorting). That is actually closer to the behavior of Linux commands.
- Run several operator in the same JVM process while MapReduce starts a new JVM for every job.

These approaches have been used for processing of graph structured data. Though how to do that really efficiently in a distributed system is still actively researched and if you data can fit in memory or even on disk on a single machine, it can often be more efficient to no go the distributed way.

### Chapter 11 - Stream processing

One fundamental difference with batch processing is that in batch processing you know the input is bounded and when it has been parsed fully. With streams your input is an unbounded stream of data which doesn't finish.

One view on stream processing is to rely on the message broker paradigm. Standards like JMS and AMQP build on it. `RabbitMQ, ActiveMQ, HornetQ, Qpid, TIBCO Enterprise Message Service, IBM MQ, Azure Service Bus, Google Cloud Pub/Sub` are implementing these. This paradigm usually goes with the idea that messages are delivered directly to the consumers and stored only if there is a delay and that once delivered a message is not stored anymore on the broker.

The alternative is a partitioned log kept on the broker up to a reasonable amount of time (in order not to run out of space). It is the idea used in Apache Kafka, Amazon Kinesis Stream, Twitter DistributedLog. With this paradigm, everything is written in the log and then delivered to the consumers, but that's usually not what is the bottleneck.

One valuable use case of streaming data is Change Data Capture (CDC) to allow a derived data systems to be kept up to date with the changes of the primary one.
It can be seen a bit similar to event sourcing with ES happening at the application level and CDC at the low level of db.

Typical applications of stream processing are complex event processing (stored queries applied to all events), stream analytics (processing of event for analytics, often with time windows), materialized views (to keep up to date with CDC idea).

All time issues seen before get a new aspect with stream processing, as for the time window case for example you could argue which time is the most relevant between the one of the processor and the one of the event (pretty much the client's one), as both have flaws and imprecisions.

Joining streams is more complex than joining batches as they are unbounded. 3 types of joins are considered:

- Stream-stream: when getting an event from one stream you look for a match in another. Usually in a limited time window, relevant for example for a user's session.
- Stream-table: when getting an event you enrich it from a db table. In order to keep performance, that db might be loaded on the event processor, which means it then needs to be kept up to date through CDC.
- Table-table: both streams are db changelogs and any change on side is joined with the latest version known of the other side.

To achieve fault tolerance, stream processing can rely on micro-batching (1 second batches) or checkpoints which allow to know where to restart after a crash. Transactions or idempotent actions can also help achieve better fault tolerance.

### Chapter 12 - The Future of Data Systems

All the different technologies and their implementations presented in the book are good for at least one purpose. There is no silver bullet solving all problems in the optimal way in term of data. So likely in a big organizations you'll probably need several of them for specific issues. That's where maintaining up to date derived data becomes almost central in the design. Batch and stream processing can almost merge on a high level in order to just be seen as ways to bootstrap a new derivation of data and keep it up to date over time afterwards.

If we assume this need for derived data sources, it can make sense to think about tools making their management easier rather than expecting the application to do it.
Two concepts there:

- Federated databases (unifying reads): unified query language to access different types of storage (Postgres foreign data wrapper goes this way)
- Unbundled databases (unifying writes): pretty much what is done with index creation in current dbs. You can imagine an index in `Elasticsearch` for a table in MySQL or a field being the sum of others (like in spreadsheets). 

Designing around data-flows (similar to design around use cases in DDD?).

Moving the boundary between write path (preprocessing of data or additional derivations) and read path to see where is the relevant place based on the load or other constraints.

Asynchronicity decouples timeliness and integrity while with ACID transactions for example they go hand in hand. It can be for the better though as if processed correctly we can have integrity while more robust systems in term of dealing with the failure of one node somewhere.

Other strong constraints like uniqueness are usually avoidable based on business decisions. You can accept to make the mistake and then cover the cost to fix it. That is to be considered with the actual cost in term of money and reputation for the mistake.

Related to mistake as well it is important to keep in mind auditability of the data. Yes hardware failures of any type are rare but yes they happen. So it's good to have ways to detect errors, ideally automated. Here again immutability can be a good starting point but doesn't do everything.

On a moral aspect engineers have to hold themselves accountable for what they build and how it is used and how it affects people in the world. It's not just about solving a technical problem!
