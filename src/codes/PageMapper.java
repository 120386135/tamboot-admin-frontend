package com.tamboot.admin.system.mapper;

import com.github.pagehelper.Page;
import com.tamboot.admin.system.condition.PageRoleCondition;
import com.tamboot.admin.system.model.SystemRoleModel;
import com.tamboot.mybatis.provider.CommonMapper;
import org.apache.ibatis.annotations.Param;

public interface SystemRoleMapper extends CommonMapper<SystemRoleModel, Long> {
    Page<SystemRoleModel> pageByCondition(@Param("pageNum") int pageNum, 
                                          @Param("pageSize") int pageSize, 
                                          @Param("condition") PageRoleCondition condition);
}