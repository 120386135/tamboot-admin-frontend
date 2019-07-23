## 概述
tamboot-excel模块基于[POI 4.0.1](https://poi.apache.org/)，封装了基于注解的excel导入及导出方法，并使用[SXSSF](https://poi.apache.org/components/spreadsheet/how-to.html#sxssf)来减少excel大数据量导出的内存消耗。


## 简单导入导出

`使用注解定义模型：`

```java
@ExcelSheet(dataRowStartIndex = 1)
public class ExcelDto {
    @ExcelCell(index = 0, name = "String类型")
    private String stringField;

    @ExcelCell(index = 1, name = "Boolean类型")
    private Boolean booleanField;

    @ExcelCell(index = 2, name = "Short类型")
    private Short shortField;

    @ExcelCell(index = 3, name = "Integer型")
    private Integer integerField;

    @ExcelCell(index = 4, name = "Long类型")
    private Long longField;

    @ExcelCell(index = 5, name = "Float类型", format = "0.00")
    private Float floatField;

    @ExcelCell(index = 6, name = "Double类型", format = "0.0000")
    private Double doubleField;

    @ExcelCell(index = 7, name = "BigDecimal类型", format = "0.0")
    private BigDecimal bigDecimal;

    @ExcelCell(index = 8, name = "Date类型", format = "yyyy-MM-dd")
    private Date dateField;

    @ExcelCell(index = 9, name = "超链接类型", type = CellValueType.HYPER_LINK)
    private String linkField;

    //些处省略了getter\setter
}
```

`基于spring mvc的导入：`

```java
@RestController
@RequestMapping("/test")
public class TestController {
    @PostMapping("/importExcel")
    public List<ExcelDto> importExcel(MultipartFile file) {
        try {
            return TambootExcelUtil.read(file.getInputStream(), ExcelDto.class);
        } catch (IOException e) {
            throw new BusinessException("导入失败");
        }
    }
}
```

`基于spring mvc的导出：`

```java
@RestController
@RequestMapping("/test")
public class TestController {
    @GetMapping("/exportExcel")
    public void exportExcel(HttpServletResponse response) {
        List<ExcelDto> excelDtos = new ArrayList<ExcelDto>();
        for (int i = 1; i <= 1000; i++) {
            ExcelDto excelDto = new ExcelDto();
            excelDto.setStringField("测试" + i);
            excelDto.setBooleanField(i % 3 == 0);
            excelDto.setShortField((short)(i * 2));
            excelDto.setIntegerField(i * 5);
            excelDto.setLongField((long)(i * 10));
            excelDto.setFloatField(i * 0.5f);
            excelDto.setDoubleField(i * 1.5d);
            excelDto.setBigDecimal(new BigDecimal(i * 2.6));
            excelDto.setDateField(new Date());
            excelDto.setLinkField("http://www.tamboot.com");
            excelDtos.add(excelDto);
        }
        try {
            TambootServletExcelUtil.write(response, excelDtos, "测试导出" + System.currentTimeMillis());
        } catch (IOException e) {
            throw new BusinessException("导出失败");
        }
    }
}
```


## 模板导入导出

`使用注解定义模型：`

```java
@ExcelSheet(dataRowStartIndex = 4, writeHeader = false)
public class TemplateExcelDto {
    @ExcelCell(index = 1)
    private String field1;

    @ExcelCell(index = 2)
    private String field2;

    @ExcelCell(index = 3)
    private String field3;

    @ExcelCell(index = 4)
    private String field4;

    @ExcelCell(index = 5)
    private String field5;

    //些处省略getter\setter
}
```

`基于spring mvc的导入：`

与简单导入相同。

`基于spring mvc的导出：`

```java
@RestController
@RequestMapping("/test")
public class TestController {
    @GetMapping("/exportTplExcel")
    public void exportTplExcel(HttpServletResponse response) {
        List<TemplateExcelDto> tplExcelDtos = new ArrayList<TemplateExcelDto>();
        for (int i = 1; i <= 100; i++) {
            TemplateExcelDto tplExcelDto = new TemplateExcelDto();
            tplExcelDto.setField1("值1-" + i);
            tplExcelDto.setField2("值2-" + i);
            tplExcelDto.setField3("值3-" + i);
            tplExcelDto.setField4("值4-" + i);
            tplExcelDto.setField5("值5-" + i);
            tplExcelDtos.add(tplExcelDto);
        }

        try {
            TambootServletExcelUtil.write(response, tplExcelDtos, "模板导出" + System.currentTimeMillis(),new File("path/to/template.xlsx"));
        } catch (IOException e) {
            throw new BusinessException("导出失败");
        }
    }
}
```


## @ExcelSheet参数

参数|说明|类型|默认值
-----|-----|-----|-----
index|选填。工作簿索引，从0开始。默认为-1，表示自动查找工作簿。|Integer|-1
name|选填。工作簿名称。如果该项值不为空，会优先根据该值查找工作簿。|String|
dataRowStartIndex|选填。数据行索引，从0开始。表示从该行开始读取数据。|Integer|0
writeHeader|选填。导出是否生成表头。|Boolean|true
-|-|-|-


## @ExcelCell参数

参数|说明|类型|默认值
-----|-----|-----|-----
index|必填。数据列索引，从0开始。|Integer|
name|选填。数据列表头。|String|使用字段名
format|选填。数据列的格式。支持日期格式、数字格式。|String|
type|选填。数据列类型。默认为AUTO，表示自动判断类型。使用超链接格式时需用HYPER_LINK类型|CellValueType|AUTO