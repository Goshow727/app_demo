import { Provide, Scope, ScopeEnum } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import moment from 'moment';
import * as path from 'path';
import * as crypto from 'crypto';

/**
 * 帮助类
 */
@Provide()
@Scope(ScopeEnum.Singleton)
export class Utils {

  /**
   * 获得dist路径
   */
  getDistPath() {
    const runPath = __dirname;
    const distIndex =
      runPath.lastIndexOf('/dist/') !== -1 ? runPath.lastIndexOf('/dist/') : runPath.lastIndexOf('\\dist\\');
    if (distIndex !== -1) {
      return path.join(runPath.substring(0, distIndex), 'dist');
    }
    return path.join(runPath, 'dist');
  }

  /**
   * 获得请求IP
   */
  async getReqIP(ctx: Context) {
    const req = ctx.req;
    return req.headers['x-forwarded-for'] || req.socket.remoteAddress?.replace('::ffff:', '') || '';
  }

  /**
   * 去除对象的空值属性
   * @param obj
   */
  async removeEmptyP(obj: object) {
    Object.keys(obj).forEach(key => {
      if (!obj[key] || obj[key] === null || obj[key] === '' || obj[key] === 'undefined') {
        delete obj[key];
      }
    });
  }

  /**
   * 线程阻塞毫秒数
   * @param ms
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * 获得最近几天的日期集合
   * @param recently
   */
  getRecentlyDates(recently, format = 'YYYY-MM-DD') {
    moment.locale('zh-cn');
    const dates = [];
    for (let i = 0; i < recently; i++) {
      dates.push(moment().subtract(i, 'days').format(format));
    }
    return dates.reverse();
  }
  /**
   * 获得最近几个月的月数
   * @param recently
   */
  getRecentlyMonths(recently, format = 'YYYY-MM') {
    moment.locale('zh-cn');
    const dates = [];
    const date = moment(Date.now()).format('YYYY-MM');
    for (let i = 0; i < recently; i++) {
      dates.push(moment(date).subtract(i, 'months').format(format));
    }
    return dates.reverse();
  }

  /**
   * 根据开始和结束时间，获得时间段内的日期集合
   * @param start
   * @param end
   */
  getBetweenDays(start, end, format = 'YYYY-MM-DD') {
    moment.locale('zh-cn');
    const dates = [];
    const startTime = moment(start).format(format);
    const endTime = moment(end).format(format);
    const days = moment(endTime).diff(moment(startTime), 'days');
    for (let i = 0; i <= days; i++) {
      dates.push(moment(startTime).add(i, 'days').format(format));
    }
    return dates;
  }

  /**
   * 根据开始和结束时间，获得时间段内的月份集合
   * @param start
   * @param end
   */
  getBetweenMonths(start, end, format = 'YYYY-MM') {
    moment.locale('zh-cn');
    const dates = [];
    const startTime = moment(start).format(format);
    const endTime = moment(end).format(format);
    const months = moment(endTime).diff(moment(startTime), 'months');
    for (let i = 0; i <= months; i++) {
      dates.push(moment(startTime).add(i, 'months').format(format));
    }
    return dates;
  }

  /**
   * 根据开始和结束时间，获得时间段内的小时集合
   * @param start
   * @param end
   */
  getBetweenHours(start, end, format = 'YYYY-MM-DD HH') {
    moment.locale('zh-cn');
    const dates = [];
    const startTime = moment(start).format(format);
    const endTime = moment(end).format(format);
    const hours = moment(endTime).diff(moment(startTime), 'hours');
    for (let i = 0; i <= hours; i++) {
      dates.push(moment(startTime).add(i, 'hours').format(format));
    }
    return dates;
  }

  /**
   * 字段转驼峰法
   * @param obj
   * @returns
   */
  toCamelCase(obj) {
    const camelCaseObject = {};
    for (const i in obj) {
      const camelCase = i.replace(/([-_][a-z])/gi, $1 => {
        return $1.toUpperCase().replace('-', '').replace('_', '');
      });
      camelCaseObject[camelCase] = obj[i];
    }
    return camelCaseObject;
  }

  /**
   * 匹配URL
   * @param pattern
   * @param url
   * @returns
   */
  matchUrl(pattern, url) {
    // 将 pattern 和 url 按 `/` 分割
    const patternParts = pattern.split('/').filter(Boolean);
    const urlParts = url.split('/').filter(Boolean);
    // 如果长度不匹配且 pattern 不包含 **，直接返回 false
    if (patternParts.length !== urlParts.length && !pattern.includes('**')) {
      return false;
    }
    for (let i = 0; i < patternParts.length; i++) {
      const patternPart = patternParts[i];
      const urlPart = urlParts[i];
      // 如果 patternPart 是 **，匹配剩余的所有部分
      if (patternPart === '**') {
        return true;
      }
      // 如果 patternPart 以 : 开头，说明是参数，直接匹配任意非空值
      if (patternPart.startsWith(':')) {
        if (!urlPart) {
          return false;
        }
        continue;
      }
      // 如果 patternPart 是 *，匹配任意非空部分
      if (patternPart === '*') {
        if (!urlPart) {
          return false;
        }
      } else if (patternPart !== urlPart) {
        return false;
      }
    }
    // 如果 pattern 和 url 的部分数量一致，则匹配成功
    return patternParts.length === urlParts.length;
  }

  /**
   * 从文本中提取 JSON 字符串并转换为对象
   * @param {string} text - 可能包含 JSON 的文本
   * @returns {Object|Array|null} - 解析出的 JSON 对象，如果没有找到有效 JSON 则返回 null
   */
  extractJSONFromText(text: string) {
    if (!text || typeof text !== 'string') {
      return null;
    }

    try {
      // 尝试直接解析整个文本
      return JSON.parse(text);
    } catch (e) {
      // 整个文本不是有效的 JSON，尝试提取 JSON 部分
    }

    // 查找可能的 JSON 开始位置（{ 或 [）
    const possibleStarts = [];
    for (let i = 0; i < text.length; i++) {
      if (text[i] === '{' || text[i] === '[') {
        possibleStarts.push(i);
      }
    }

    // 从每个可能的起始位置尝试提取 JSON
    for (const startIndex of possibleStarts) {
      let openBraces = 0;
      let openBrackets = 0;
      let inString = false;
      let escapeNext = false;

      for (let i = startIndex; i < text.length; i++) {
        const char = text[i];

        // 处理转义字符
        if (inString && !escapeNext && char === '\\') {
          escapeNext = true;
          continue;
        }

        // 处理字符串边界
        if (!escapeNext && char === '"') {
          inString = !inString;
        }

        if (!inString) {
          // 只在不在字符串内部时才计算括号
          if (char === '{') openBraces++;
          else if (char === '}') openBraces--;
          else if (char === '[') openBrackets++;
          else if (char === ']') openBrackets--;
        }

        escapeNext = false;

        // 检查是否找到了完整的 JSON 结构
        if (
          (openBraces === 0 && text[startIndex] === '{' && char === '}') ||
          (openBrackets === 0 && text[startIndex] === '[' && char === ']')
        ) {
          const jsonStr = text.substring(startIndex, i + 1);
          try {
            const result = JSON.parse(jsonStr);
            return result;
          } catch (e) {
            // 这个候选 JSON 无效，继续尝试下一个
            break;
          }
        }
      }
    }

    return null; // 没有找到有效的 JSON
  }



  /**
   * 是否是相对路径
   * @param path 
   * @returns 
   */
  isAbsoluteUrl(path: string): boolean {
    return /^(http?:)?\/\//.test(path);
  }

  /**
 * 生成订单号
 * @param type 1: 年月日时分秒+时间戳， 2:现行时间+时间戳， 3: 现行取时间戳
 * @returns {string} 订单号
 */
  orderNumber(type: number): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    // const seconds = date.getSeconds().toString().padStart(2, '0');
    const dateString = `${year}${month}${day}${hours}${minutes}`;
    // const dateString = ;
    if (type = 1) {
      return dateString + Date.now();
    }
    if (type = 2) {
      return `${day}${hours}${minutes}` + Date.now();
    }
    if (type = 3) {
      return Date.now().toString().substring(3);
    }
  }


  /**
     * 32位随机字符
     * @returns 
     */
  randomStr32() {
    // return crypto.randomBytes(16).toString('hex');
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 32; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }


  /**
   * 随机字符
   * @param number 字符长度
   * @returns 
   */
  randomStr(number: number = 16) {
    // return crypto.randomBytes(16).toString('hex');
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < number; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }




  md5(text: string) {
    return crypto.createHash('md5').update(text).digest('hex');
  }
  /**
   * 修复的AES-GCM解密函数
   * @param {string} apiV3Key - APIv3密钥
   * @param {string} nonce - 随机数
   * @param {string} associatedData - 附加数据
   * @param {string} ciphertext - 完整Base64编码密文
   * @returns {string} 解密后的明文
   */
  decryptAESGCM(apiV3Key: string, nonce: string, associatedData: string, ciphertext: string): string {
    try {
      // 参数验证
      if (!ciphertext) {
        throw new Error('ciphertext 不能为空');
      }
      if (!apiV3Key || apiV3Key.length !== 32) {
        throw new Error('apiV3Key 必须是32字节的字符串');
      }

      // 将Base64密文转换为Buffer
      const ciphertextBuffer = Buffer.from(ciphertext, 'base64');

      // 从密文中提取认证标签（最后16字节）和实际密文
      const authTagLength = 16;
      if (ciphertextBuffer.length < authTagLength) {
        throw new Error('密文长度不足');
      }

      const authTag = ciphertextBuffer.slice(ciphertextBuffer.length - authTagLength);
      const actualCiphertext = ciphertextBuffer.slice(0, ciphertextBuffer.length - authTagLength);

      // 创建解密器
      const decipher = crypto.createDecipheriv('aes-256-gcm', apiV3Key, nonce);

      // 设置认证标签
      decipher.setAuthTag(authTag);

      // 设置AAD（附加认证数据）
      if (associatedData) {
        decipher.setAAD(Buffer.from(associatedData));
      }

      // 执行解密
      let decrypted = decipher.update(actualCiphertext);
      decrypted = Buffer.concat([decrypted, decipher.final()]);
      return decrypted.toString('utf8');
    } catch (error) {
      throw new Error(`AES-GCM 解密失败: ${error}`);
    }
  }

}
