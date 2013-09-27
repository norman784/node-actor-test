# Node Actor Test

## I'm testing actor concepts:

- Fork: using child_process.fork
- Require: using just require('actor-file')
- Mixed (not implemented): fork every actor supervisor and then with every request require each actor (when it finished the GC must remove it from memory)

Maybe need to spawn a new actor for every request in each concept I'm testing.

# AB results

## Fork

```bash
$ ab -r -n 1000 -c 10 http://127.0.0.1:3001/
This is ApacheBench, Version 2.3 <$Revision: 655654 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking 127.0.0.1 (be patient)
Send request failed!
Send request failed!
Send request failed!
Send request failed!
Completed 100 requests
Send request failed!
Completed 200 requests
Completed 300 requests
Completed 400 requests
Send request failed!
Completed 500 requests
Send request failed!
Send request failed!
Completed 600 requests
Completed 700 requests
Completed 800 requests
Completed 900 requests
Send request failed!
Completed 1000 requests
Finished 1000 requests


Server Software:
Server Hostname:        127.0.0.1
Server Port:            3001

Document Path:          /
Document Length:        4 bytes

Concurrency Level:      10
Time taken for tests:   44.140 seconds
Complete requests:      1000
Failed requests:        190
   (Connect: 0, Receive: 186, Length: 4, Exceptions: 0)
Write errors:           9
Total transferred:      104895 bytes
HTML transferred:       3996 bytes
Requests per second:    22.66 [#/sec] (mean)
Time per request:       441.403 [ms] (mean)
Time per request:       44.140 [ms] (mean, across all concurrent requests)
Transfer rate:          2.32 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0  439  63.9    442     667
Processing:     0    0   3.0      0      71
Waiting:        0    0   2.9      0      70
Total:          1  440  63.4    442     667

Percentage of the requests served within a certain time (ms)
  50%    442
  66%    450
  75%    455
  80%    458
  90%    476
  95%    507
  98%    556
  99%    600
 100%    667 (longest request)
```

## Require

```bash
$ ab -r -n 1000 -c 10 http://127.0.0.1:3002/
This is ApacheBench, Version 2.3 <$Revision: 655654 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking 127.0.0.1 (be patient)
Send request failed!
Send request failed!
Send request failed!
Completed 100 requests
Completed 200 requests
Completed 300 requests
Send request failed!
Completed 400 requests
Send request failed!
Send request failed!
Completed 500 requests
Completed 600 requests
Send request failed!
Completed 700 requests
Completed 800 requests
Send request failed!
Completed 900 requests
Completed 1000 requests
Finished 1000 requests


Server Software:
Server Hostname:        127.0.0.1
Server Port:            3002

Document Path:          /
Document Length:        18 bytes

Concurrency Level:      10
Time taken for tests:   43.386 seconds
Complete requests:      1000
Failed requests:        188
   (Connect: 0, Receive: 184, Length: 4, Exceptions: 0)
Write errors:           8
Total transferred:      117882 bytes
HTML transferred:       17982 bytes
Requests per second:    23.05 [#/sec] (mean)
Time per request:       433.856 [ms] (mean)
Time per request:       43.386 [ms] (mean, across all concurrent requests)
Transfer rate:          2.65 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0  432  55.7    437     531
Processing:     0    0   2.5      0      61
Waiting:        0    0   2.5      0      60
Total:          1  432  55.0    437     531

Percentage of the requests served within a certain time (ms)
  50%    437
  66%    445
  75%    450
  80%    454
  90%    464
  95%    474
  98%    483
  99%    498
 100%    531 (longest request)
```