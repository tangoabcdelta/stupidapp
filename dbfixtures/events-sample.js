[
  '{{repeat(1, 2)}}',
  {
    event_name: '{{lorem([2], [\'words\'])}}',
    event_genre: '{{lorem([1], [\'words\'])}}',
    event_country: '{{country()}}',
    event_date: '{{date()}}',
    event_date_type: '{{random("scheduled", "tentative", "expected", "rumored")}}',
    event_status: '{{random("to-be-held", "cancelled")}}',
    event_time_zone: '{{random("IST", "PT", "BLA")}}'
  }
]

[
  '{{repeat(1, 2)}}',
  {
    event_name: '{{lorem([2], [\'words\'])}}',
    event_genre: '{{lorem([1], [\'words\'])}}',
    event_country: '{{country()}}',
    event_date: '{{date()}}',
    event_date_type: '{{random("scheduled", "tentative", "expected", "rumored")}}',
    event_status: '{{random("to-be-held", "cancelled")}}',
    event_time_zone: '{{random("IST", "PT", "BLA")}}'
  }
]
