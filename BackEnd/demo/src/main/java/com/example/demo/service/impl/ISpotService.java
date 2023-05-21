package com.example.demo.service.impl;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.ScheduleDao;
import com.example.demo.dao.SpotDao;
import com.example.demo.dto.Schedule;
import com.example.demo.dto.Spot;
import com.example.demo.service.SpotService;

@Service
public class ISpotService implements SpotService {

    @Autowired
    SpotDao dao;

    @Autowired
    ScheduleDao scheduleDao;

    @Override
    public Map<String, Object> findBySctIdx(String sctIdx) {
        /**
         * dao로 바로 붙으면 안되는데 !!
         */
        Schedule schedule = scheduleDao.findByIdx(Long.valueOf(sctIdx));
        List<Spot> spotList = dao.findBySctIdx(sctIdx);
        Map<String, Object> result = new HashMap<>();
        LocalDate startLocalDate = schedule.getStartDate();
        LocalDate endLocalDate = schedule.getEndDate();

        result.put("idx", schedule.getIdx());
        result.put("name", schedule.getName());

        Map<String, Object> dateRange = new HashMap();
        dateRange.put("start", schedule.getStartDate());
        dateRange.put("end", schedule.getEndDate());
        result.put("dateRange", dateRange);

        LocalDateTime date1 = startLocalDate.atStartOfDay();
        LocalDateTime date2 = endLocalDate.atStartOfDay();
        int diff = (int) Duration.between(date1, date2).toDays() + 1;

        List<Object> scheduleList = new ArrayList<>();

        for (int i = 0; i < diff; i++) {
            Map<String, Object> detailMap = new HashMap<>();
            List<Object> detailList = new ArrayList<>();

            LocalDate date = startLocalDate.plusDays(i);
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            String targetDate = date.format(formatter);
            detailMap.put("date", targetDate);
            for (Spot spot : spotList) {
                Map<String, Object> daySchedule = new HashMap<>();
                String day = spot.getDay().format(formatter);
                if (day != null && targetDate.equals(day)) {
                    daySchedule = makeScheduleMap(spot);
                    detailList.add(daySchedule);
                }
            }
            detailMap.put("list", detailList);
            scheduleList.add(detailMap);
        }

        result.put("schedule", scheduleList);
        return result;
    }

    @Override
    public Map<String, Object> save(Map<String, Object> map) throws Exception {
        String dateStr = (String) map.get("date");
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(dateStr, formatter);

        String sctIdx = (String) map.get("sctIdx");

        dao.deleteByDayAndSctIdx(date, sctIdx);

        List<Spot> saveList = new ArrayList<>();
        List<Map<String, Object>> mapList = (List<Map<String, Object>>) map.get("list");

        for (Map<String, Object> item : mapList) {
            String name = (String) item.get("placeName");
            String orderString = (String) item.get("order");
            String address = (String) item.get("address");
            Integer order = Integer.parseInt(orderString);
            String la = (String) item.get("la");
            String lo = (String) item.get("lo");
            Spot spot = new Spot();
            spot.setSctIdx(sctIdx);
            spot.setDay(date);
            spot.setName(name);
            spot.setAddress(address);
            spot.setSeq(order);
            spot.setLatitude(la);
            spot.setLongitude(lo);
            saveList.add(spot);
        }

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("date", dateStr);
        resultMap.put("sctIdx", sctIdx);
        List<Object> detailList = new ArrayList<>();
        for (Spot spot : saveList) {
            Spot saveSpot = dao.save(spot);
            Map<String, Object> saveMap = makeScheduleMap(saveSpot);
            detailList.add(saveMap);
        }
        resultMap.put("list", detailList);

        return resultMap;
    }

    @Override
    public void deleteBySctIdx(Long idx) {
        dao.deleteBySctIdx(String.valueOf(idx));
    }

    private Map<String, Object> makeScheduleMap(Spot spot) {
        Map<String, Object> map = new HashMap<>();
        map.put("idx", spot.getIdx());
        map.put("placeName", spot.getName());
        map.put("order", spot.getSeq());
        map.put("address", spot.getAddress());
        map.put("la", spot.getLatitude());
        map.put("lo", spot.getLongitude());

        return map;
    }
}
