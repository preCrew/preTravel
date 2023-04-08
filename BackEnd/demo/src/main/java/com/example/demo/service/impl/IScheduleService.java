package com.example.demo.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.ScheduleDao;
import com.example.demo.dto.File;
import com.example.demo.dto.Schedule;
import com.example.demo.service.FileService;
import com.example.demo.service.ScheduleService;
import com.example.demo.service.SpotService;

@Service
public class IScheduleService implements ScheduleService {

    @Autowired
    ScheduleDao dao;

    @Autowired
    SpotService spotService;

    @Autowired
    FileService fileService;

    @Override
    public List<Schedule> findByMemberIdx(String memberIdx) {
        List<Schedule> list = dao.findByMemberIdx(memberIdx);
        for (Schedule schedule : list) {
            List<File> tmpList = fileService.findByBoardNameAndBoardIdx("schedule", schedule.getIdx());
            schedule.setFile(tmpList);
        }
        return dao.findByMemberIdx(memberIdx);
    }

    @Override
    public Schedule save(Schedule schedule) {
        String fileIdx = (String) (schedule.getFile());
        Schedule result = dao.save(schedule);
        if (fileIdx == null) {
            return result;
        } else {
            List<File> tmpList = fileService.findByBoardNameAndBoardIdx("schedule", result.getIdx());
            for (File file : tmpList) {
                file.setBoardIdx(null);
                fileService.saveFile(file);
            }

            Optional<File> optFile = fileService.findById(fileIdx);
            if (optFile.isEmpty()) {
                return null;
            }
            File file = optFile.get();
            file.setBoardIdx(result.getIdx());
            File resultFile = fileService.saveFile(file);
            List<File> fileList = new ArrayList<>();
            fileList.add(resultFile);
            result.setFile(fileList);
            return result;
        }
    }

    @Override
    public void deleteById(Map<String, Object> map) {
        List<Long> list = ((List<String>) map.get("idxList")).stream()
                .map(Long::valueOf)
                .collect(Collectors.toList());

        for (Long idx : list) {
            List<File> tmpList = fileService.findByBoardNameAndBoardIdx("schedule", idx);
            for (File file : tmpList) {
                fileService.delete(String.valueOf(file.getIdx()));
            }

            spotService.deleteBySctIdx(idx);
            dao.deleteById(idx);
        }
    }

}
