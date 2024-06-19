export const getBraceletAbility = (htmlString: string) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString, 'text/html')

  const elements = doc.body.children
  const result = []

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i]

    if (element.tagName === 'IMG' && element.nextSibling !== null && element.nextSibling.textContent !== null) {
      const textContent = element.nextSibling.textContent.trim()

      if (textContent.includes('+')) {
        result.push(textContent)
      }
    }

    if (element.tagName === 'FONT') {
      const textContent = element.textContent

      if (textContent === '회생') {
        if (elements[i + 1].textContent === '100') {
          result.push('회생 하')
        }
        if (elements[i + 1].textContent === '130') {
          result.push('회생 중')
        }
        if (elements[i + 1].textContent === '160') {
          result.push('회생 상')
        }
      }

      if (textContent === '긴급수혈') {
        if (elements[i + 1].textContent === '10000') {
          result.push('긴급수혈 하')
        }
        if (elements[i + 1].textContent === '13000') {
          result.push('긴급수혈 중')
        }
        if (elements[i + 1].textContent === '16000') {
          result.push('긴급수혈 상')
        }
      }

      if (textContent === '응급처치') {
        if (elements[i + 1].textContent === '5000') {
          result.push('응급처치 하')
        }
        if (elements[i + 1].textContent === '6500') {
          result.push('응급처치 중')
        }
        if (elements[i + 1].textContent === '8000') {
          result.push('응급처치 상')
        }
      }

      if (textContent === '앵콜') {
        if (elements[i + 1].textContent === '16%') {
          result.push('앵콜 하')
        }
        if (elements[i + 1].textContent === '20%') {
          result.push('앵콜 중')
        }
        if (elements[i + 1].textContent === '25%') {
          result.push('앵콜 상')
        }
      }

      if (textContent === '쐐기') {
        if (elements[i + 1].textContent === '0.35%') {
          result.push('쐐기 하')
        }
        if (elements[i + 1].textContent === '0.45%') {
          result.push('쐐기 중')
        }
        if (elements[i + 1].textContent === '0.5%') {
          result.push('쐐기 상')
        }
      }

      if (textContent === '망치') {
        if (elements[i + 3].textContent === '8%') {
          result.push('망치 하')
        }
        if (elements[i + 3].textContent === '10%') {
          result.push('망치 중')
        }
        if (elements[i + 3].textContent === '12%') {
          result.push('망치 상')
        }
      }

      if (textContent === '순환') {
        if (elements[i + 2].textContent === '3%') {
          result.push('순환 하')
        }
        if (elements[i + 2].textContent === '3.5%') {
          result.push('순환 중')
        }
        if (elements[i + 2].textContent === '4%') {
          result.push('순환 상')
        }
      }

      if (textContent === '열정') {
        if (elements[i + 2].textContent === '3%') {
          result.push('열정 하')
        }
        if (elements[i + 2].textContent === '3.5%') {
          result.push('열정 중')
        }
        if (elements[i + 2].textContent === '4%') {
          result.push('열정 상')
        }
      }

      if (textContent === '냉정') {
        if (elements[i + 2].textContent === '3%') {
          result.push('냉정 하')
        }
        if (elements[i + 2].textContent === '3.5%') {
          result.push('냉정 중')
        }
        if (elements[i + 2].textContent === '4%') {
          result.push('냉정 상')
        }
      }

      if (textContent === '비수') {
        if (elements[i + 1].textContent === '1.8%') {
          result.push('비수 하')
        }
        if (elements[i + 1].textContent === '2.1%') {
          result.push('비수 중')
        }
        if (elements[i + 1].textContent === '2.5%') {
          result.push('비수 상')
        }
      }

      if (textContent === '약점 노출') {
        if (elements[i + 1].textContent === '1.8%') {
          result.push('약점 노출 하')
        }
        if (elements[i + 1].textContent === '2.1%') {
          result.push('약점 노출 중')
        }
        if (elements[i + 1].textContent === '2.5%') {
          result.push('약점 노출 상')
        }
      }

      if (textContent === '깨달음') {
        if (elements[i + 2].textContent === '4%') {
          result.push('깨달음 하')
        }
        if (elements[i + 2].textContent === '5%') {
          result.push('깨달음 중')
        }
        if (elements[i + 2].textContent === '6%') {
          result.push('깨달음 상')
        }
      }

      if (textContent === '응원') {
        if (elements[i + 2].textContent === '0.9%') {
          result.push('응원 하')
        }
        if (elements[i + 2].textContent === '1.1%') {
          result.push('응원 중')
        }
        if (elements[i + 2].textContent === '1.3%') {
          result.push('응원 상')
        }
      }

      if (textContent === '수확') {
        if (elements[i + 2].textContent === '190') {
          result.push('수확 하')
        }
        if (elements[i + 2].textContent === '220') {
          result.push('수확 중')
        }
        if (elements[i + 2].textContent === '250') {
          result.push('수확 상')
        }
      }

      if (textContent === '보상') {
        if (elements[i + 2].textContent === '7') {
          result.push('보상 하')
        }
        if (elements[i + 2].textContent === '6') {
          result.push('보상 중')
        }
        if (elements[i + 2].textContent === '5') {
          result.push('보상 상')
        }
      }

      if (textContent === '무기 공격력') {
        if (elements[i + 2].textContent === '1600') {
          result.push('무기 공격력 하')
        }
        if (elements[i + 2].textContent === '1900') {
          result.push('무기 공격력 중')
        }
        if (elements[i + 2].textContent === '2200') {
          result.push('무기 공격력 상')
        }
      }

      if (textContent === '우월') {
        if (elements[i + 1].textContent === '2%') {
          result.push('우월 하')
        }
        if (elements[i + 1].textContent === '2.5%') {
          result.push('우월 중')
        }
        if (elements[i + 1].textContent === '3%') {
          result.push('우월 상')
        }
      }

      if (textContent === '습격') {
        if (elements[i + 1].textContent === '6%') {
          result.push('습격 하')
        }
        if (elements[i + 1].textContent === '8%') {
          result.push('습격 중')
        }
        if (elements[i + 1].textContent === '10%') {
          result.push('습격 상')
        }
      }

      if (textContent === '정밀') {
        if (elements[i + 1].textContent === '3%') {
          result.push('정밀 하')
        }
        if (elements[i + 1].textContent === '4%') {
          result.push('정밀 중')
        }
        if (elements[i + 1].textContent === '5%') {
          result.push('정밀 상')
        }
      }

      if (textContent === '상처약화') {
        if (elements[i + 1].textContent === '3%') {
          result.push('상처약화 하')
        }
        if (elements[i + 1].textContent === '5%') {
          result.push('상처약화 중')
        }
        if (elements[i + 1].textContent === '7%') {
          result.push('상처약화 상')
        }
      }

      if (textContent === '분개') {
        if (elements[i + 1].textContent === '20') {
          result.push('분개 하')
        }
        if (elements[i + 1].textContent === '17') {
          result.push('분개 중')
        }
        if (elements[i + 1].textContent === '14') {
          result.push('분개 상')
        }
      }

      if (textContent === '기습') {
        if (elements[i + 1].textContent === '3%') {
          result.push('기습 하')
        }
        if (elements[i + 1].textContent === '3.5%') {
          result.push('기습 중')
        }
        if (elements[i + 1].textContent === '4%') {
          result.push('기습 상')
        }
      }

      if (textContent === '결투') {
        if (elements[i + 1].textContent === '3%') {
          result.push('결투 하')
        }
        if (elements[i + 1].textContent === '3.5%') {
          result.push('결투 중')
        }
        if (elements[i + 1].textContent === '4%') {
          result.push('결투 상')
        }
      }

      if (textContent === '적립') {
        if (elements[i + 2].textContent === '30%') {
          result.push('적립 하')
        }
        if (elements[i + 2].textContent === '40%') {
          result.push('적립 중')
        }
        if (elements[i + 2].textContent === '50%') {
          result.push('적립 상')
        }
      }
    }
  }

  return result
}
