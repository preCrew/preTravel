package com.example.demo.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.ReviewDao;
import com.example.demo.dto.File;
import com.example.demo.dto.Review;
import com.example.demo.service.FileService;
import com.example.demo.service.ReviewService;

@Service
public class IReviewService implements ReviewService {

    @Autowired
    ReviewDao dao;

    @Autowired
    FileService fileService;

    @Override
    public List<Review> findData(Map<String, Object> map) {
        Double smallLa = Double.valueOf(map.get("smallLa").toString());
        Double largeLa = Double.valueOf(map.get("largeLa").toString());
        Double smallLo = Double.valueOf(map.get("smallLo").toString());
        Double largeLo = Double.valueOf(map.get("largeLo").toString());
        String memberIdx = (String) map.get("memberIdx");

        List<Review> list = dao.findByLatitudeBetweenAndLongitudeBetweenAndMemberIdx(smallLa, largeLa, smallLo, largeLo,
                memberIdx);

        return list;
    }

    @Override
    public Object findByMemberIdx(String memberIdx, Integer page, Integer size) {

        if (size == 0) {
            return dao.findByMemberIdx(memberIdx);
        } else {
            List<Review> list = dao.findByMemberIdxPage(memberIdx, page, size);
            Map<String, Object> result = new HashMap<>();
            Boolean isEnd = false;
            if (list.size() == 0) {
                isEnd = true;
            }

            result.put("list", list);
            result.put("isEnd", isEnd);

            return result;
        }
    }

    @Override
    public Optional<Review> findByIdx(String idx) {
        Optional<Review> optReview = dao.findByIdx(idx);
        String address = optReview.get().getAddress();
        String[] parts = address.trim().split("\\s+");
        String cityAndProvince = parts[1];
        optReview.get().setAddress(cityAndProvince);

        List<File> tmpList = fileService.findByBoardNameAndBoardIdx("review", optReview.get().getIdx());
        optReview.get().setFile(tmpList);
        return optReview;
    }

    @Override
    public Review save(Review review) {
        List<Long> list = ((List<String>) review.getFile()).stream()
                .map(Long::valueOf)
                .collect(Collectors.toList());
        Review result = new Review();
        if (review.getIdx() == null) {
            result = dao.save(review);
        } else {
            Optional<Review> optReview = dao.findById(review.getIdx());
            LocalDateTime creDateTime = optReview.get().getCreateDate();
            Review mdfReview = dao.save(review);
            mdfReview.setCreateDate(creDateTime);
            result = mdfReview;
        }

        List<File> fileList = new ArrayList<>();
        for (Long fileIdx : list) {
            Optional<File> optFile = fileService.findById(String.valueOf(fileIdx));
            if (!optFile.isEmpty()) {
                File file = optFile.get();
                file.setBoardIdx(result.getIdx());
                File resultFile = fileService.saveFile(file);
                fileList.add(resultFile);
            }
        }
        result.setFile(fileList);

        return result;
    }

    @Override
    public void deleteById(Long idx) {
        List<File> tmpList = fileService.findByBoardNameAndBoardIdx("review", idx);
        for (File file : tmpList) {
            fileService.delete(String.valueOf(file.getIdx()));
        }
        dao.deleteById(idx);
    }

    @Override
    public List<Review> findByMemberIdxAndAddress(String memberIdx, String address) {
        return dao.findByMemberIdxAndAddress(memberIdx, address);
    }

}
